import React, {Component} from 'react';
import {connect} from 'react-redux';
import auth from '../../utils/spotify/auth';

import '../../scss/LyricsChecker.scss';
import Header from '../spotify/Header';
import Footer from '../spotify/Footer';
import UserPlaylists from '../spotify/UserPlaylists';
import MainView from '../spotify/MainView';
import ArtWork from '../spotify/ArtWork';
import MainHeader from '../spotify/MainHeader';
import SideMenu from '../spotify/SideMenu';
import {ActionType} from '../../redux/spotify/index';
import Button from "@material-ui/core/Button";


import LoginModal from '../common/LoginModal';


class LyricsChecker extends Component {

    static audio;

    constructor(props) {
        super(props);

        this.state = {
            mode: "init"
        }

        this._auth = this._auth.bind(this);
        this._login = this._login.bind(this);
    }

    componentDidMount() {
        this._prepare_before_auth(this._auth);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.access_token) {
            this.props.fetchUser(nextProps.access_token);
            this.props.fetchSongs(nextProps.access_token);
        }

        if (this.audio !== undefined) {
            this.audio.volume = nextProps.volume / 100;
        }
    }

    _prepare_before_auth(cb) {
        const {setTokens, refresh_token} = this.props;
        //Storeにrefresh_tokenがある場合
        if (refresh_token) {
            setTokens({refresh_token});
            cb();
        } else if (localStorage.getItem('refresh_token')) {
            //Sessionにrefresh_tokenがある場合
            const data = {refresh_token: localStorage.getItem('refresh_token')};
            setTokens(data);
            cb();
        } else {
            cb();
        }
    }

    _failed() {
        this.setState({mode: 'error'})
    }

    static _code_success(code) {
        console.log("_code_success")
    }

    _token_success(access_token) {
        this.props.setToken(access_token)
        this._init()
    }

    _auth() {
        //this._implicitGrant();
        auth.c_validateAccessToken('/', (code, token) => {
            code ? this._code_success(code) : token ? this._token_success(token) : this._failed();
        });
    }

    _login() {
        const {authorized} = this.props;
        if (authorized) {
            this._init();
        } else {
            auth.c_getCredenetialCode("/");
        }
    }

    _init() {
        const {access_token} = this.props;
        console.log("_init");
        this.setState({mode: 'token'});
    }


    _implicitGrant() {
        let hashParams = auth.c_webHash();
        if (!hashParams.access_token) {
            auth.c_implicitGrant();
        } else {
            console.log("hashParams", hashParams);
            this.props.setTokens(hashParams);
        }
    }


    stopSong = () => {
        if (this.audio) {
            this.props.stopSong();
            this.audio.pause();
        }
    }

    pauseSong = () => {
        if (this.audio) {
            this.props.pauseSong();
            this.audio.pause();
        }
    }

    resumeSong = () => {
        if (this.audio) {
            this.props.resumeSong();
            this.audio.play();
        }
    }

    audioControl = (song) => {

        const {playSong, stopSong} = this.props;

        if (this.audio === undefined) {
            playSong(song.track);
            this.audio = new Audio(song.track.preview_url);
            this.audio.play();
        } else {
            stopSong();
            this.audio.pause();
            playSong(song.track);
            this.audio = new Audio(song.track.preview_url);
            this.audio.play();
        }
    }

    render() {
        const {mode} = this.state;

        return (
            <div className='App'>
                <div className='app-container'>
                    {
                        mode === 'init' && (
                            <div className="initial">
                                <Button onClick={() => this._login()} variant="contained" size="large" color="secondary">Hello</Button>
                            </div>
                        )
                    }
                    {
                        mode === 'error' && (
                            <div className="login">
                                <img src="/images/lyrics_logo.png"  onClick={() => this._login()} />
                                {/*<Button onClick={() => this._login()} variant="contained" size="large" color="primary">Login</Button>*/}
                            </div>
                        )
                    }

                    {
                        mode === 'token' && (
                            <React.Fragment>
                                <div className='left-side-section'>
                                    <SideMenu/>
                                    <UserPlaylists/>
                                    <ArtWork/>
                                </div>

                                <div className='main-section'>
                                    <Header/>
                                    <div className='main-section-container'>
                                        <MainHeader
                                            pauseSong={this.pauseSong}
                                            resumeSong={this.resumeSong}
                                        />
                                        <MainView
                                            pauseSong={this.pauseSong}
                                            resumeSong={this.resumeSong}
                                            audioControl={this.audioControl}
                                        />
                                    </div>
                                </div>

                                <Footer
                                    stopSong={this.stopSong}
                                    pauseSong={this.pauseSong}
                                    resumeSong={this.resumeSong}
                                    audioControl={this.audioControl}
                                />
                            </React.Fragment>
                        )
                    }
                </div>
                {
                    <LoginModal open={true} type="main"/>
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        access_token: state.app.tokenReducer.access_token,
        volume: state.app.soundReducer.volume
    };

};

const mapDispatchToProps = dispatch => ({
    setToken: (data) => dispatch({type: ActionType.SET_TOKEN, value: data}),
    setTokens: (data) => dispatch({type: ActionType.SET_AUTHORIZATION, value: data}),
    fetchUser: (data) => dispatch({type: ActionType.SAGA_FETCH_USER, value: data}),
    playSong: (data) => dispatch({type: ActionType.PLAY_SONG, value: data}),
    stopSong: () => dispatch({type: ActionType.STOP_SONG}),
    pauseSong: () => dispatch({type: ActionType.PAUSE_SONG}),
    resumeSong: () => dispatch({type: ActionType.RESUME_SONG}),
    fetchCategories: (data) => dispatch({type: ActionType.SAGA_FETCH_CATEGORIES, value: data}),
    fetchSongs: (data) => dispatch({type: ActionType.SAGA_FETCH_SONGS, value: data}),
});


export default connect(mapStateToProps, mapDispatchToProps)(LyricsChecker);
