/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_ALBUMS', fetchAlbums);
}


function* fetchAlbums(action) {
    yield put({type: 'FETCH_ALBUMS_PENDING'});




    const result = yield axios.get(`https://api.spotify.com/v1/me/albums`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res =>{
        return res;
        }

    );
    yield put({type:'FETCH_ALBUMS_SUCCESS',value:result.data.items});
}
