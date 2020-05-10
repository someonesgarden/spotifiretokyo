/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'


export default function* user() {

    yield takeLatest('SAGA_FETCH_USER', fetchUser);
    yield takeLatest('SAGA_ADD_SONG_TO_LIBRARY', addSongToLibrary);
}


function* fetchUser(action){

    const result = yield axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + action.value
        }
    }).then(res => res);

    yield put({
        type: 'FETCH_USER_SUCCESS',
        value:result.data
    })
}

function* addSongToLibrary(action){

    const result = yield axios.get(`https://api.spotify.com/v1/me/tracks?ids=${action.value.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + action.value.accessToken
        }
    }).then(res => {
        if(res.data.ok) {
            return action.value.id;
        }
    });

    yield put({
        type: 'ADD_SONG_TO_LIBRARY_SUCCESS',
        value:result
    })
}
