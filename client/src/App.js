import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
		let hashParams = {};
		let e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while (e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}

		if (!hashParams.access_token) {
			let url = "https://accounts.spotify.com/authorize";
			url = url + "?client_id=" + window.clientId;
			url = url + "&scope=" + window.scopes;
			url = url + "&response_type=token";
			url = url + "&redirect_uri=" + window.redirectUri;
			window.location.href = url;
		} else {
			this.props.setToken(hashParams.access_token);
		}
	}

	componentWillReceiveProps(nextProps) {
	  if(nextProps.token) {
	    this.props.fetchUser(nextProps.token);
	  };

	  if(this.audio !== undefined) {
	    this.audio.volume = nextProps.volume / 100;
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

App.propTypes = {
  token: PropTypes.string,
  fetchUser: PropTypes.func,
  setToken: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  volume: PropTypes.number
};

const mapStateToProps = (state) => {

  return {
    token: state.tokenReducer.token,
    volume: state.soundReducer.volume
  };

};

const mapDispatchToProps = dispatch => ({
	setToken:  (data)=> dispatch({type:ActionType.SET_TOKEN,value:data}),
	fetchUser: (data)=> dispatch({type:ActionType.SAGA_FETCH_USER, value:data}),
	playSong:  (data)=> dispatch({type:ActionType.PLAY_SONG, value:data}),
	stopSong:  () => dispatch({type:ActionType.STOP_SONG}),
	pauseSong: () => dispatch({type:ActionType.PAUSE_SONG}),
	resumeSong:() => dispatch({type:ActionType.RESUME_SONG})
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
