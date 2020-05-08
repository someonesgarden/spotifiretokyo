import MainView from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    headerTitle: state.app.uiReducer.title
  };

};

export default connect(mapStateToProps)(MainView);
