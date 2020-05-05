import {all} from 'redux-saga/effects';

import spotifyWatcher from './watchers/spotifyWatcher';

export default function* rootSaga() {
    yield all([
        spotifyWatcher()
    ]);
}
