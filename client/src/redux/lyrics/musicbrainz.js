/* eslint-disable */

const ActionType = {
	SAGA_MB_GET_TRACK_ISRC:'SAGA_MB_GET_TRACK_ISRC',
	MB_GET_TRACK_ISRC_OK:'MB_GET_TRACK_ISRC_OK'
};

let store = {
	tracks:{},
	mbupdated:null
};


const reducer = {
	[ActionType.MB_GET_TRACK_ISRC_OK]: (payload) => {

		if(payload.value.tracks.length>0) {
			store.tracks[payload.value.isrc] = payload.value.tracks;
			console.log("tracks!",store.tracks)
		}else {
			store.tracks[payload.value.isrc] = [];
		}

		store.mbupdated = payload.value.isrc

		return {
			...payload.state.mbReducer,
			...store
		}
	},
};


export default {
	reducer,
	store,
	ActionType
}


