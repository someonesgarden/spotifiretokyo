/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import {BASE_URL} from "../../../redux/site";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_ARTISTS', fetchArtists);
    yield takeLatest('SAGA_FETCH_ARTIST_SONGS', fetchArtistSongs);
}

function* fetchArtists(action) {
    let headers = {'Authorization': 'Bearer ' + action.value.accessToken};

    yield put({type:'FETCH_ARTISTS_PENDING'});
    const result =  yield axios.get(`${BASE_URL}/spotify/artists?ids=${action.value.artistIds}`,
        {headers: headers}).then(res => res.data);
    yield put({type:'FETCH_ARTISTS_SUCCESS',value:result});
}

function* fetchArtistSongs(action){
    let headers = {'Authorization': 'Bearer ' + action.value.accessToken};

    yield put({type:'FETCH_ARTIST_SONGS_PENDING'});
    const result = yield axios.get(`${BASE_URL}/spotify/artists/${action.value.artistId}/top-tracks`,
        {headers: headers}).then(res => {
        //if(res.statusText === "Unauthorized") window.location.href = './';
        res.items = res.data.tracks && res.data.tracks.map(item => {return {track: item}});
        return res;
    });
    yield put({type:'FETCH_ARTIST_SONGS_SUCCESS',value:result.items});
}
