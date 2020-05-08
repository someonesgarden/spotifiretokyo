const ActionType = {
	SAGA_MM_GET_LYRICS_MBID:'SAGA_MM_GET_LYRICS_MBID',
	MM_GET_LYRICS_MBID_OK:'MM_GET_LYRICS_MBID_OK'
};

let store = {
	lyrics:{},
	mmupdated:null
};


const reducer = {
	[ActionType.MM_GET_LYRICS_MBID_OK]: (payload) => {

		console.log(payload);
		//store.mmupdated = payload.value.isrc

		return {
			...payload.state.mmReducer,
			...store
		}
	},
};


export default {
	reducer,
	store,
	ActionType
}


