import BrowseView from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {

  return {
    view: state.browseReducer.view,
    viewType: state.songsReducer.viewType,
    access_token: state.tokenReducer.access_token
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPlaylistSongs:(userId, playlistId, accessToken)=>dispatch({type:ActionType.SAGA_FETCH_PLAYLIST_SONGS,value:{userId, playlistId, accessToken}}),
  updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data}),
  addPlaylistItem:(data)=>dispatch({type:ActionType.ADD_PLAYLIST_ITEM,value:data})
});


export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);
