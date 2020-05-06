import AlbumList from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {

  return {
    access_token: state.tokenReducer.access_token ? state.tokenReducer.access_token : '',
    artists: state.artistsReducer.artistList ? state.artistsReducer.artistList.artists : ''
  };

};

const mapDispatchToProps = dispatch => ({
  fetchArtistSongs:(artistId, accessToken)=> dispatch({type:ActionType.SAGA_FETCH_ARTIST_SONGS,value:{artistId, accessToken}}),
  updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data})
});


export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
