import SongControls from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';


const mapStateToProps = (state) => {

  return {
    songName: state.app.songsReducer.songDetails ? state.app.songsReducer.songDetails.name : '',
    artistName: state.app.songsReducer.songDetails ? state.app.songsReducer.songDetails.artists[0].name : '',
    songPlaying: state.app.songsReducer.songPlaying,
    timeElapsed: state.app.songsReducer.timeElapsed,
    songPaused: state.app.songsReducer.songPaused,
    songDetails: state.app.songsReducer.songDetails,
    songs: state.app.songsReducer.songs
  };
};

const mapDispatchToProps = dispatch => ({
  increaseSongTime:(data)=>dispatch({type:ActionType.INCREASE_SONG_TIME,value:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
