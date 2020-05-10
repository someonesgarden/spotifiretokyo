/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_PLAYLIST_MENU', fetchPlaylistsMenu);
    yield takeLatest('SAGA_FETCH_PLAYLIST_SONGS',fetchPlaylistSongs);
}


function* fetchPlaylistsMenu(action){
    yield put({type: 'FETCH_PLAYLIST_MENU_PENDING'});

    const result = yield axios.get(`https://api.spotify.com/v1/users/${action.value.userId}/playlists`,
        {headers: {'Authorization': 'Bearer ' + action.value.accessToken}}).then(res => {
            return res
    });
    yield put({
            type: 'FETCH_PLAYLIST_MENU_SUCCESS',
            value: result.data.items
        });
}

function* fetchPlaylistSongs(action){

    yield put({type: 'FETCH_PLAYLIST_SONGS_PENDING'});
    const result = yield axios.get(`https://api.spotify.com/v1/users/${action.value.userId}/playlists/${action.value.playlistId}/tracks`,
        {headers: {'Authorization': 'Bearer ' + action.value.accessToken}}).then(res => {
        //remove duplicate tracks
        let items = res.data.items.filter((item)=> item.track && item.track.id);
        res.items = uniqBy(items, (item) => item.track.id);
        return res;
    });

    yield put({
        type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
        value:result.items
    })
}
