import UserPlaylists from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {
	return {
		userId: state.app.userReducer.user ? state.app.userReducer.user.id : '',
		playlistMenu: state.app.playlistReducer.playlistMenu ? state.app.playlistReducer.playlistMenu : '',
		access_token: state.app.tokenReducer.access_token ? state.app.tokenReducer.access_token : '',
		title: state.app.uiReducer.title
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPlaylistsMenu:(userId, accessToken)=>dispatch({type:ActionType.SAGA_FETCH_PLAYLIST_MENU,value:{userId, accessToken}}),
	fetchPlaylistSongs:(userId, playlistId, accessToken)=>dispatch({type:ActionType.SAGA_FETCH_PLAYLIST_SONGS,value:{userId, playlistId, accessToken}}),
	updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
