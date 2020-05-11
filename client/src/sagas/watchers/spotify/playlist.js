/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";
import {BASE_URL} from "../../../redux/site";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_PLAYLIST_MENU', fetchPlaylistsMenu);
    yield takeLatest('SAGA_FETCH_PLAYLIST_SONGS',fetchPlaylistSongs);
}


function* fetchPlaylistsMenu(action){
    const headers = {'Authorization': 'Bearer ' + action.value.accessToken};
    yield put({type: 'FETCH_PLAYLIST_MENU_PENDING'});

    const result = yield axios.get(`${BASE_URL}/spotify/users/${action.value.userId}/playlists`, {headers: headers}).then(res => res.data);
    yield put({type: 'FETCH_PLAYLIST_MENU_SUCCESS', value: result.items});
}

function* fetchPlaylistSongs(action){
    const headers = {'Authorization': 'Bearer ' + action.value.accessToken};
    yield put({type: 'FETCH_PLAYLIST_SONGS_PENDING'});

    const result = yield axios.get(`${BASE_URL}/spotify/playlists/${action.value.playlistId}/tracks`, {headers: headers}).then(res => {
        let items = res.data.items && res.data.items.filter((item)=> item.track && item.track.id);
        res.items = uniqBy(items, (item) => item.track.id);
        return res;
    }).catch(err=>err.message);

    yield put({type: 'FETCH_PLAYLIST_SONGS_SUCCESS', value:result.items})
}
