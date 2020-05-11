/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import {BASE_URL} from "../../../redux/site";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_ALBUMS', fetchAlbums);
    yield takeLatest('SAGA_GET_ALBUM',  albumGetAlbum);
}


function* fetchAlbums(action) {
    yield put({type: 'FETCH_ALBUMS_PENDING'});
    const headers = {'Authorization': 'Bearer ' + action.value};
    const result = yield axios.get(`${BASE_URL}/spotify/albums`, {headers: headers}).then(res => res.data);
    yield put({type:'FETCH_ALBUMS_SUCCESS',value:result.items});
}


function* albumGetAlbum(action){
    const headers = {'Authorization': 'Bearer ' + action.value.accessToken};
    const result = yield axios.get(`${BASE_URL}/spotify/albums/${action.value.album.id}`, {headers: headers}).then(res =>res.data).catch(err=>err.message);

    yield
        if(result.tracks && result.tracks.items){
            yield put({type: 'FETCH_SONGS_SUCCESS', value: result.tracks.items.map(item=> {return {track:{...item, album:action.value.album}}})});
            yield put({type:'UPDATE_HEADER_TITLE',value:'Songs'});
            yield put({type:'UPDATE_VIEW_TYPE',value:'Songs'});
        }
}
