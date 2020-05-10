/* eslint-disable */

const ActionType = {
    SAGA_KGET_LYRICS: 'SAGA_KGET_LYRICS',
    KGET_LYRICS_OK: 'KGET_LYRICS_OK',
    KGET_LYRICS_LOADING: 'KGET_LYRICS_LOADING'

};

let store = {
    lyrics: {},
    kgupdated: null,
    kgloading: false
};


const reducer = {

    [ActionType.KGET_LYRICS_LOADING]: (payload) => {
        store.kgloading = true

        return {
            ...payload.state.kgReducer,
            ...store
        }
    },

    [ActionType.KGET_LYRICS_OK]: (payload) => {

        let isrc = payload.value && payload.value.isrc;
        let lyrics = payload.value && payload.value.lyrics;

        if (lyrics) {
            store.lyrics[isrc] = lyrics;
        } else {
            store.lyrics[isrc] = "NO DATA";
        }

        store.kgupdated = isrc
        store.kgloading = false

        return {
            ...payload.state.kgReducer,
            ...store
        }
    },
};


export default {
    reducer,
    store,
    ActionType
}


