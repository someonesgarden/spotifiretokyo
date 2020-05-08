import SongList from "./component";
import { connect } from "react-redux";
import {ActionType} from "../../../redux/actions";

const mapStateToProps = (state) => {
  return {
    access_token: state.app.tokenReducer.access_token ? state.app.tokenReducer.access_token : '',
    songs: state.app.songsReducer.songs ? state.app.songsReducer.songs : '',
    fetchSongsError: state.app.songsReducer.fetchSongsError,
    fetchSongsPending: state.app.songsReducer.fetchSongsPending,
    fetchPlaylistSongsPending: state.app.songsReducer.fetchPlaylistSongsPending,
    songPlaying: state.app.songsReducer.songPlaying,
    songPaused: state.app.songsReducer.songPaused,
    songId: state.app.songsReducer.songId,
    songAddedId: state.app.userReducer.songId || '',
    viewType: state.app.songsReducer.viewType,
    mbtracks:state.app.mbReducer.tracks,
    mbupdated:state.app.mbReducer.mbupdated,
    mmlyrics:state.app.mmReducer.lyrics,
    mmupdated:state.app.mmReducer.mmupdated,

    kglyrics:state.app.kgReducer.lyrics,
    kgupdated:state.app.kgReducer.kgupdated,
    kgloading:state.app.kgReducer.kgloading,


    base_url:state.app.site.base_url
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSongs: (data) => dispatch({type: ActionType.SAGA_FETCH_SONGS, value: data}),
  addSongToLibrary: (accessToken, id) => dispatch({type: ActionType.SAGA_ADD_SONG_TO_LIBRARY, value:{accessToken, id}}),
  mbIsrcTracks: (data) => dispatch({type: ActionType.SAGA_MB_GET_TRACK_ISRC, value: data}),
  mmGetLyricsOK:(isrc,lyrics) => dispatch({type:ActionType.MM_GET_LYRICS_MBID_OK, value:{isrc,lyrics}}),
  kgGetLyrics:(isrc,song,artist) => dispatch({type:ActionType.SAGA_KGET_LYRICS,value:{isrc,song,artist}})
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
