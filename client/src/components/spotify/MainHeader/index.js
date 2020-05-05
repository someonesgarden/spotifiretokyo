import MainHeader from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {

  return {
    songPaused: state.songsReducer.songPaused,
    headerTitle: state.uiReducer.title,
    viewType: state.songsReducer.viewType,
    playlists: state.playlistReducer.playlists,
    artists: state.artistsReducer.artistList ? state.artistsReducer.artistList.artists : [],
    token: state.tokenReducer.token
  };

};

const mapDispatchToProps = dispatch => ({
  fetchCategories:(data)=>dispatch({type:ActionType.SAGA_FETCH_CATEGORIES,value:data}),
  fetchNewReleases:(data)=>dispatch({type:ActionType.SAGA_FETCH_NEW_RELEASES,value:data}),
  updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data}),
  updateViewType:(data)=>dispatch({type:ActionType.UPDATE_VIEW_TYPE,value:data}),
  fetchFeatured:(data)=> dispatch({type:ActionType.SAGA_FETCH_FEATURED,value:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
