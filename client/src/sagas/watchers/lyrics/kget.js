/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import siteStore from "../../../redux/site/index";


export default function* spotifyWatcher() {
    yield takeLatest('SAGA_KGET_LYRICS', kgGetLyrics);
}

function* kgGetLyrics(action) {
    const BASE_URL = siteStore.store.site.base_url;

    const isrc = action.value.isrc;
    const song = action.value.song;
    const artist = action.value.artist;

    yield put({type:'KGET_LYRICS_LOADING',value:{}})

    const result = yield axios.get(`${BASE_URL}/kget/browse/spider?artist=${artist}&song=${song}`).then(res => {
            return res.data
        }).catch(err => err.response)
    yield put({type:'KGET_LYRICS_OK',value:{isrc:isrc,...result}})
}

