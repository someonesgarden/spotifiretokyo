import SongControls from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';


const mapStateToProps = (state) => {

  return {
    songName: state.songsReducer.songDetails ? state.songsReducer.songDetails.name : '',
    artistName: state.songsReducer.songDetails ? state.songsReducer.songDetails.artists[0].name : '',
    songPlaying: state.songsReducer.songPlaying,
    timeElapsed: state.songsReducer.timeElapsed,
    songPaused: state.songsReducer.songPaused,
    songDetails: state.songsReducer.songDetails,
    songs: state.songsReducer.songs
  };
};

const mapDispatchToProps = dispatch => ({
  increaseSongTime:(data)=>dispatch({type:ActionType.INCREASE_SONG_TIME,value:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
