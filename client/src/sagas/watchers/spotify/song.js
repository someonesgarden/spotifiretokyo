import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_SONGS', fetchSongs);
    yield takeLatest('SAGA_SEARCH_SONGS', searchSongs);
    yield takeLatest('SAGA_FETCH_RECENTLY_PLAYED',fetchRecentlyPlayed);

}



function* fetchSongs(action){
    yield put({ type: 'FETCH_SONGS_PENDING'});

    const result = yield axios.get(`https://api.spotify.com/v1/me/tracks?limit=50`, {
        headers: {
            'Authorization': 'Bearer ' + action.value
        }
    }).then(res => {
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

    yield put({
        type: 'SEARCH_SONGS_PENDING'
    });
    const result = yield axios.get(`https://api.spotify.com/v1/search?q=${action.value.searchTerm}&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + action.value.accessToken,
            'Accept': 'application/json'
        }
    }).then(res => {
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

    yield put({
        type: 'FETCH_RECENTLY_PLAYED_PENDING'
    });
    const result = yield axios.get(`https://api.spotify.com/v1/me/player/recently-played`, {
        headers: {
            'Authorization': 'Bearer ' + action.value
        }
    }).then(res => {
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
