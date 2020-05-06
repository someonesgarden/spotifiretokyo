import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from './utils/spotify/auth';

import './App.scss';
import Header from './components/spotify/Header';
import Footer from './components/spotify/Footer';
import UserPlaylists from './components/spotify/UserPlaylists';
import MainView from './components/spotify/MainView';
import ArtWork from './components/spotify/ArtWork';
import MainHeader from './components/spotify/MainHeader';
import SideMenu from './components/spotify/SideMenu';
import {ActionType} from './redux/spotify/index';


class App extends Component {

	static audio;

	componentDidMount() {
		this._prepare_before_auth();
	}

	componentWillReceiveProps(nextProps, nextContext) {
	  if(nextProps.access_token) {
	    this.props.fetchUser(nextProps.access_token);
	  }

	  if(this.audio !== undefined) {
	    this.audio.volume = nextProps.volume / 100;
	  }
	}


	_prepare_before_auth(){

		const {setTokens} = this.props;

		let hashParams = auth.c_webHash();
		if (!hashParams.access_token) {
			let url = "https://accounts.spotify.com/authorize";
			url = url + "?client_id=" + window.clientId;
			url = url + "&scope=" + window.scopes;
			url = url + "&response_type=token";
			url = url + "&redirect_uri=" + window.redirectUri;
			window.location.href = url;
		} else {
			setTokens(hashParams);
		}
	}


	stopSong = () => {
	  if(this.audio) {
	    this.props.stopSong();
	    this.audio.pause();
	  }
	}

	pauseSong = () => {
	  if(this.audio) {
	    this.props.pauseSong();
	    this.audio.pause();
	  }
	}

	resumeSong = () => {
	  if(this.audio) {
	    this.props.resumeSong();
	    this.audio.play();
	  }
	}

	audioControl = (song) => {

	  const { playSong, stopSong } = this.props;

	  if(this.audio === undefined){
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
	  return (

	    <div className='App'>
	      <div className='app-container'>

	        <div className='left-side-section'>
	          <SideMenu />
	          <UserPlaylists />
	          <ArtWork />
	        </div>

	        <div className='main-section'>
	          <Header />
	          <div className='main-section-container'>
	            <MainHeader
	              pauseSong={ this.pauseSong }
	              resumeSong={ this.resumeSong }
	            />
	            <MainView
	              pauseSong={this.pauseSong}
	              resumeSong={ this.resumeSong }
	              audioControl={ this.audioControl }
	            />
	          </div>
	        </div>

	        <Footer
	          stopSong={ this.stopSong }
	          pauseSong={ this.pauseSong }
	          resumeSong={ this.resumeSong }
	          audioControl={ this.audioControl }
	        />
	      </div>
	    </div>
	  );
	}
}


const mapStateToProps = (state) => {

  return {
    access_token: state.tokenReducer.access_token,
    volume: state.soundReducer.volume
  };

};

const mapDispatchToProps = dispatch => ({
	setToken:  (data)=> dispatch({type:ActionType.SET_TOKEN,value:data}),
	setTokens: (data)=> dispatch({type:ActionType.SET_AUTHORIZATION,value:data}),
	fetchUser: (data)=> dispatch({type:ActionType.SAGA_FETCH_USER, value:data}),
	playSong:  (data)=> dispatch({type:ActionType.PLAY_SONG, value:data}),
	stopSong:  () => dispatch({type:ActionType.STOP_SONG}),
	pauseSong: () => dispatch({type:ActionType.PAUSE_SONG}),
	resumeSong:() => dispatch({type:ActionType.RESUME_SONG})
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
