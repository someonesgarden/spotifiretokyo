import TrackSearch from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token
  };
};


const mapDispatchToProps = dispatch => ({
  searchSongs:(searchTerm, accessToken)=> dispatch({type:ActionType.SAGA_SEARCH_SONGS,value:{searchTerm, accessToken}})
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);