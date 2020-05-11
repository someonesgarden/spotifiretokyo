/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";
import {BASE_URL} from '../../../redux/site';


export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_SONGS', fetchSongs);
    yield takeLatest('SAGA_SEARCH_SONGS', searchSongs);
    yield takeLatest('SAGA_FETCH_RECENTLY_PLAYED',fetchRecentlyPlayed);
}


function* fetchSongs(action){
    const headers = {'Authorization': 'Bearer ' + action.value};
    yield put({ type: 'FETCH_SONGS_PENDING'});

    const result = yield axios.get(`${BASE_URL}/spotify/me/tracks?limit=50`, {headers: headers}).then(res => {
        if(res.statusText === "Unauthorized") window.location.href = './';

        let artistIds = uniqBy(res.data.items, (item) => {
            return item.track.artists[0].name;
        }).map(item => {
            return item.track.artists[0].id;
        }).join(',');
        return {
            artistIds:artistIds,
            items:res.data.items
        }
    });

    yield put({type:'SET_ARTIST_IDS',value:result.artistIds});
    yield put({type:'FETCH_SONGS_SUCCESS',value:result.items});
}

function* searchSongs(action){

    const headers = {
        'Authorization': 'Bearer ' + action.value.accessToken,
        'Accept': 'application/json'
    };

    yield put({
        type: 'SEARCH_SONGS_PENDING'
    });
    const result = yield axios.get(`${BASE_URL}/spotify/search?q=${action.value.searchTerm}&types=track`, {headers: headers}).then(res => {
        res.items = res.data.tracks.items.map(item => {
            return {
                track: item
            };
        });
        return res;
    });

    yield put({
        type: 'SEARCH_SONGS_SUCCESS',
        value:result.items
    })
}

function* fetchRecentlyPlayed(action){
    const headers = {'Authorization': 'Bearer ' + action.value};
    yield put({
        type: 'FETCH_RECENTLY_PLAYED_PENDING'
    });
    const result = yield axios.get(`${BASE_URL}/spotify/me/player/recently-played`, {headers:headers}).then(res => {
        //remove duplicates from recently played
        res.items = uniqBy(res.data.items, (item) => {
            return item.track.id;
        });
        return res;
    });
    yield put({
        type: 'FETCH_RECENTLY_PLAYED_SUCCESS',
        value:result.items
    });
}
