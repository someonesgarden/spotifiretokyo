import BrowseView from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {

  return {
    view: state.app.browseReducer.view,
    viewType: state.app.songsReducer.viewType,
    access_token: state.app.tokenReducer.access_token
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPlaylistSongs:(userId, playlistId, accessToken)=>dispatch({type:ActionType.SAGA_FETCH_PLAYLIST_SONGS,value:{userId, playlistId, accessToken}}),
  updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data}),
  addPlaylistItem:(data)=>dispatch({type:ActionType.ADD_PLAYLIST_ITEM,value:data}),

  albumGetAlbum:(accessToken,album)=>dispatch({type:ActionType.SAGA_GET_ALBUM,value:{accessToken,album}}),
  getGenrePlaylists:(accessToken,genre)=>dispatch({type:ActionType.SAGA_FETCH_CAT_PLAYLISTS,value:{accessToken,genre}})
});


export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);
