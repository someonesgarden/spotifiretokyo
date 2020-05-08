import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import siteStore from "../../../redux/site/index";


export default function* spotifyWatcher() {
    yield takeLatest('SAGA_MM_GET_LYRICS_MBID', mmGetLyrics);
}

function* mmGetLyrics(action) {
    const BASE_URL = siteStore.store.site.base_url;
    const mbid = action.value.mbid;
    const isrc = action.value.isrc;
    const result = yield axios.get(`${BASE_URL}/musixmatch/track/trackLyrics?mbid=${mbid}`).then(res => {
            return res.data.message && res.data.message.body && res.data.message.body.lyrics
        }).catch(err => err.response)
    yield put({type:'MM_GET_LYRICS_MBID_OK',value:{lyrics:result,mbid:mbid,isrc:isrc}})
}
