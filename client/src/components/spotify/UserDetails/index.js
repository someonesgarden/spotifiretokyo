import UserDetails from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

	return {
		displayName: state.app.userReducer.user ? state.app.userReducer.user.display_name : '',
		userImage: state.app.userReducer.user && state.app.userReducer.user.images[0] ? state.app.userReducer.user.images[0].url : ''
	};

};


export default connect(mapStateToProps)(UserDetails);
