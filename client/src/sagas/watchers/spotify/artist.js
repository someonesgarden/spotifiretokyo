/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_ARTISTS', fetchArtists);
    yield takeLatest('SAGA_FETCH_ARTIST_SONGS', fetchArtistSongs);
}


function* fetchArtists(action) {
    yield put({type:'FETCH_ARTISTS_PENDING'});
    const result =  yield axios.get(`https://api.spotify.com/v1/artists?ids=${action.value.artistIds}`,
        {headers: {'Authorization': 'Bearer ' + action.value.accessToken}}).then(res => res);
    yield put({type:'FETCH_ARTISTS_SUCCESS',value:result.data});
}


function* fetchArtistSongs(action){
    yield put({type:'FETCH_ARTIST_SONGS_PENDING'});
    const result = yield axios.get(`https://api.spotify.com/v1/artists/${action.value.artistId}/top-tracks?country=US`,
        {headers: {'Authorization': 'Bearer ' + action.value.accessToken}}).then(res => {
        if(res.statusText === "Unauthorized") window.location.href = './';
        res.items = res.data.tracks.map(item => {return {track: item};});
        return res;
    });
    yield put({type:'FETCH_ARTIST_SONGS_SUCCESS',value:result.items});
}

