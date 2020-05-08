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
		//let mbid   = payload.value && payload.value.mbid;
		let isrc   = payload.value && payload.value.isrc;
		let lyrics = payload.value && payload.value.lyrics;
		if(lyrics && lyrics.lyrics_body){
			store.lyrics[isrc] = lyrics.lyrics_body;
		}else{
			store.lyrics[isrc] = "NO DATA";
		}

		store.mmupdated = isrc

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


