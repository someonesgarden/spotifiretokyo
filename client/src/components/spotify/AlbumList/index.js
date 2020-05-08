import AlbumList from "./component";
import { connect } from "react-redux";
import uniqBy from 'lodash/uniqBy';

const mapStateToProps = (state) => {

  const albumSongs = state.app.songsReducer.songs ? uniqBy(state.app.songsReducer.songs, (item) => {
    return item.track.album.name;
  }) : '';

  return {
    songs: albumSongs
  };

};

export default connect(mapStateToProps)(AlbumList);
