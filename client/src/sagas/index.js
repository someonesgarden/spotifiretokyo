import {all, put} from 'redux-saga/effects';

import albumWatcher from './watchers/spotify/album';
import artistWatcher from './watchers/spotify/artist';
import playlistWatcher from './watchers/spotify/playlist';
import browseWatcher from './watchers/spotify/browse';
import songWatcher from './watchers/spotify/song';
import userWatcher from './watchers/spotify/user';

import musicBrainzWatcher from './watchers/lyrics/musicbrainz';
import musixMatchWatcher from './watchers/lyrics/musixmatch';
import kgetWatcher from './watchers/lyrics/kget';

export default function* rootSaga() {

    try {
        yield all([
            albumWatcher(),
            artistWatcher(),
            playlistWatcher(),
            browseWatcher(),
            songWatcher(),
            userWatcher(),
            musicBrainzWatcher(),
            musixMatchWatcher(),
            kgetWatcher()
        ]);
    } catch (error) {
        yield put({type:'ASN_FAILED_LOGONLY', value:error})
    }

}
