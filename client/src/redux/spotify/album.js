/* eslint-disable */

const ActionType = {
	SAGA_FETCH_ALBUMS:'SAGA_FETCH_ALBUMS',
	SAGA_GET_ALBUM:'SAGA_GET_ALBUM',

	FETCH_ALBUMS_PENDING:'FETCH_ALBUMS_PENDING',
	FETCH_ALBUMS_SUCCESS:'FETCH_ALBUMS_SUCCESS',
	FETCH_ALBUMS_ERROR:'FETCH_ALBUMS_ERROR'
};

let store = {};

const reducer = {
	[ActionType.FETCH_ALBUMS_PENDING]: (payload) => {
		store.fetchAlbumsPending = true;
		return {
			...payload.state.albumsReducer,
			...store
		}
	},

	[ActionType.FETCH_ALBUMS_SUCCESS]: (payload) => {
		store.albums = payload.value;
		store.fetchAlbumsError = false;
		store.fetchAlbumsPending = false;
		return {
			...payload.state.albumsReducer,
			...store
		}
	},
	[ActionType.FETCH_ALBUMS_ERROR]: (payload) => {
		store.fetchAlbumsError = true;
		store.fetchAlbumsPending = false;
		return {
			...payload.state.albumsReducer,
			...store
		}
	}
};


export default {
	reducer,
	store,
	ActionType
}


