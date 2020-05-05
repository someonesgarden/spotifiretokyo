import {all, put} from 'redux-saga/effects';

import spotifyWatcher from './watchers/spotifyWatcher';

export default function* rootSaga() {

    try {
        yield all([
            spotifyWatcher()
        ]);
    } catch (error) {
        yield put({type:'ASN_FAILED_LOGONLY', value:error})
    }

}
