/* eslint-disable */
//import uniqBy from 'lodash/uniqBy';

const ActionType = {
    SAGA_FETCH_PLAYLIST_MENU: 'SAGA_FETCH_PLAYLIST_MENU',
    SAGA_FETCH_PLAYLIST_SONGS: 'SAGA_FETCH_PLAYLIST_SONGS',
    FETCH_PLAYLIST_MENU_PENDING: 'FETCH_PLAYLIST_MENU_PENDING',
    FETCH_PLAYLIST_MENU_SUCCESS: 'FETCH_PLAYLIST_MENU_SUCCESS',
    FETCH_PLAYLIST_MENU_ERROR: 'FETCH_PLAYLIST_MENU_ERROR',
    ADD_PLAYLIST_ITEM: 'ADD_PLAYLIST_ITEM',
    FETCH_PLAYLIST_SONGS_PENDING: 'FETCH_PLAYLIST_SONGS_PENDING',
    FETCH_PLAYLIST_SONGS_SUCCESS: 'FETCH_PLAYLIST_SONGS_SUCCESS',
    FETCH_PLAYLIST_SONGS_ERROR: 'FETCH_PLAYLIST_SONGS_ERROR',

    ASN_FAILED_LOGONLY: 'ASN_FAILED_LOGONLY',
};

const store = {
    fetchPlaylistPending: false,
    fetchPlaylistError: false,
};


const reducer = {

    [ActionType.ASN_FAILED_LOGONLY]: (payload) => {
        console.log("ASN_FAILED_LOGONLY", payload);
        return store;
    },

    [ActionType.FETCH_PLAYLIST_MENU_PENDING]: (payload) => {

        store.fetchPlaylistPending = true;

        return {
            ...payload.state.playlistReducer,
            ...store
        }
    },

    [ActionType.FETCH_PLAYLIST_MENU_SUCCESS]: (payload) => {
        store.playlistMenu = payload.value;
        store.playlists = payload.value;
        store.fetchPlaylistError = false;
        store.fetchPlaylistPending = false;

        return {
            ...payload.state.playlistReducer,
            ...store
        }
    },

    [ActionType.ADD_PLAYLIST_ITEM]: (payload) => {
        console.log("ADD_PLAYLIST_ITEM", payload);
        //store = payload.state.playlistReducer;

        console.log("store", store);

        console.log("payload", payload.state.playlists);

        console.log("payload.value", payload.value);
        store.playlists = [
            ...payload.state.playlistReducer.playlists,
            payload.value
        ];


        return {
            ...payload.state.playlistReducer,
            ...store
        };
    },

    [ActionType.FETCH_PLAYLIST_MENU_ERROR]: (payload) => {
        store.fetchPlaylistError = true;
        store.fetchPlaylistPending = false;

        return {
            ...payload.state.playlistReducer,
            ...store
        };
    }
};


export default {
    store,
    reducer,
    ActionType
}
