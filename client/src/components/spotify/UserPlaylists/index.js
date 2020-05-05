import UserPlaylists from "./component";
import { connect } from "react-redux";
import {ActionType} from '../../../redux/spotify';

const mapStateToProps = (state) => {
	return {
		userId: state.userReducer.user ? state.userReducer.user.id : '',
		playlistMenu: state.playlistReducer.playlistMenu ? state.playlistReducer.playlistMenu : '',
		token: state.tokenReducer.token ? state.tokenReducer.token : '',
		title: state.uiReducer.title
	};
};

const mapDispatchToProps = dispatch => ({
	fetchPlaylistsMenu:(userId, accessToken)=>dispatch({type:ActionType.SAGA_FETCH_PLAYLIST_MENU,value:{userId, accessToken}}),
	fetchPlaylistSongs:(userId, playlistId, accessToken)=>dispatch({type:ActionType.SAGA_FETCH_PLAYLIST_SONGS,value:{userId, playlistId, accessToken}}),
	updateHeaderTitle:(data)=>dispatch({type:ActionType.UPDATE_HEADER_TITLE,value:data})
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
