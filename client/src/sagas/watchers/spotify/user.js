/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import {BASE_URL} from '../../../redux/site';


export default function* user() {

    yield takeLatest('SAGA_FETCH_USER', fetchUser);
    yield takeLatest('SAGA_ADD_SONG_TO_LIBRARY', addSongToLibrary);
}


function* fetchUser(action){

    const headers = {'Authorization': 'Bearer ' + action.value};

    const result = yield axios.get(`${BASE_URL}/spotify/me`, {headers: headers}).then(res => res);

    yield put({
        type: 'FETCH_USER_SUCCESS',
        value:result.data
    })
}

function* addSongToLibrary(action){

    const headers = {'Authorization': 'Bearer ' + action.value.accessToken};

    const result = yield axios.get(`${BASE_URL}/spotify/me/tracks?ids=${action.value.id}`, {
        method: 'PUT',
        headers: headers}).then(res => {
        if(res.data.ok) {
            return action.value.id;
        }
    });

    yield put({
        type: 'ADD_SONG_TO_LIBRARY_SUCCESS',
        value:result
    })
}
