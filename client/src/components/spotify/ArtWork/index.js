/* eslint-disable */

import SongControls from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    albumImage: state.app.songsReducer.songDetails ? state.app.songsReducer.songDetails.album.images[0].url : ''
  };

};

export default connect(mapStateToProps)(SongControls);
