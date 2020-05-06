import SongList from "./component";
import { connect } from "react-redux";
import {ActionType} from "../../../redux/spotify";

const mapStateToProps = (state) => {
  return {
    access_token: state.tokenReducer.access_token ? state.tokenReducer.access_token : '',
    songs: state.songsReducer.songs ? state.songsReducer.songs : '',
    fetchSongsError: state.songsReducer.fetchSongsError,
    fetchSongsPending: state.songsReducer.fetchSongsPending,
    fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
    songPlaying: state.songsReducer.songPlaying,
    songPaused: state.songsReducer.songPaused,
    songId: state.songsReducer.songId,
    songAddedId: state.userReducer.songId || '',
    viewType: state.songsReducer.viewType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSongs: (data) => dispatch({type: ActionType.SAGA_FETCH_SONGS, value: data}),
  addSongToLibrary: (accessToken, id) => dispatch({type: ActionType.SAGA_ADD_SONG_TO_LIBRARY, value:{accessToken, id}})
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
