import SongControls from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {
  return {
    volume: state.app.soundReducer.volume
  };
};

const mapDispatchToProps = dispatch => ({
  updateVolume:(data)=>dispatch({type:ActionType.UPDATE_VOLUME,value:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(SongControls);
