import SideMenu from "./component";
import { connect } from "react-redux";

import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {
  return {
    userId: state.app.userReducer.user ? state.app.userReducer.user.id : '',
    access_token: state.app.tokenReducer.access_token ? state.app.tokenReducer.access_token : '',
    artistIds: state.app.artistsReducer.artistIds,
    title: state.app.uiReducer.title
  };
};

const mapDispatchToProps = dispatch => ({
  fetchRecentlyPlayed:(data)=> dispatch({type:ActionType.SAGA_FETCH_RECENTLY_PLAYED,value:data}),
  fetchSongs:(data)=>dispatch({type:ActionType.SAGA_FETCH_SONGS,value:data}),
  fetchAlbums:(data)=>dispatch({type:ActionType.SAGA_FETCH_ALBUMS,value:data}),
  fetchArtists:(accessToken, artistIds)=> dispatch({type:ActionType.SAGA_FETCH_ARTISTS,value:{accessToken, artistIds}}),
  fetchFeatured:(data)=>dispatch({type:ActionType.SAGA_FETCH_FEATURED,value:data}),
  updateViewType:(data)=>dispatch({type:ActionType.UPDATE_VIEW_TYPE,value:data}),
  updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data})
});


export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
