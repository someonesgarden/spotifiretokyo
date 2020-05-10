/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import siteStore from "../../../redux/site/index";


export default function* spotifyWatcher() {
    yield takeLatest('SAGA_MB_GET_TRACK_ISRC', mbIsrcTracks);
}


function* mbIsrcTracks(action) {
    const BASE_URL = siteStore.store.site.base_url;
    const isrc = action.value;
    const result = yield axios.get(`${BASE_URL}/musicbrainz/browse/searchRecording?isrc=${isrc}`).then(res =>res.data).catch(err => err.response)
    yield put({type:'MB_GET_TRACK_ISRC_OK',value:{tracks:result,isrc:isrc}})
}
