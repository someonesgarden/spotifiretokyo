/* eslint-disable */

const ActionType = {
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    FETCH_USER_ERROR: 'FETCH_USER_ERROR',
    ADD_SONG_TO_LIBRARY_SUCCESS: 'ADD_SONG_TO_LIBRARY_SUCCESS',
    ADD_SONG_TO_LIBRARY_ERROR: 'ADD_SONG_TO_LIBRARY_ERROR',
    SAGA_FETCH_USER: 'SAGA_FETCH_USER',
    SAGA_ADD_SONG_TO_LIBRARY: 'SAGA_ADD_SONG_TO_LIBRARY'
};

const store = {};


const reducer = {
    [ActionType.FETCH_USER_SUCCESS]: (payload) => {
        store.user = payload.value;
        store.fetchUserError = false;
        return {
            ...payload.state.userReducer,
            ...store
        }
    },

    [ActionType.FETCH_USER_ERROR]: (payload) => {
        store.fetchUserError = true;
        return {
            ...payload.state.userReducer,
            ...store
        }
    },

    [ActionType.ADD_SONG_TO_LIBRARY_SUCCESS]: (payload) => {
        store.songAddedToLibrary = true;
        store.songId = payload.value;
        return {
            ...payload.state.userReducer,
            ...store
        }
    },

    [ActionType.ADD_SONG_TO_LIBRARY_ERROR]: (payload) => {
        store.songAddedToLibrary = false;
        return {
            ...payload.state.userReducer,
            ...store
        }
    }
};


export default {
    store,
    reducer,
    ActionType
}
