import AlbumList from "./component";
import { connect } from "react-redux";
import uniqBy from 'lodash/uniqBy';
import {ActionType} from "../../../redux/spotify";


const mapStateToProps = (state) => {


  const albumSongs = state.app.songsReducer.songs ? uniqBy(state.app.songsReducer.songs, (item) => {
    return item.track.album.name;
  }) : '';

  return {
    access_token: state.app.tokenReducer.access_token,
    songs: albumSongs
  };
};

const mapDispatchToProps = dispatch => ({
  albumGetAlbum:(accessToken,album)=>dispatch({type:ActionType.SAGA_GET_ALBUM,value:{accessToken,album}})
});


export default connect(mapStateToProps,mapDispatchToProps)(AlbumList);
