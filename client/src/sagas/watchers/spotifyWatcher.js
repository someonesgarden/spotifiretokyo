import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_ALBUMS', fetchAlbums);
    yield takeLatest('SAGA_FETCH_ARTISTS', fetchArtists);
    yield takeLatest('SAGA_FETCH_ARTIST_SONGS', fetchArtistSongs);
    yield takeLatest('SAGA_FETCH_CATEGORIES', fetchCategories);
    yield takeLatest('SAGA_FETCH_NEW_RELEASES', fetchNewReleases);
    yield takeLatest('SAGA_FETCH_FEATURED', fetchFeatured);
    yield takeLatest('SAGA_FETCH_PLAYLIST_MENU', fetchPlaylistsMenu);
    yield takeLatest('SAGA_FETCH_PLAYLIST_SONGS',fetchPlaylistSongs);
    yield takeLatest('SAGA_FETCH_SONGS', fetchSongs);
    yield takeLatest('SAGA_SEARCH_SONGS', searchSongs);
    yield takeLatest('SAGA_FETCH_RECENTLY_PLAYED',fetchRecentlyPlayed);
    yield takeLatest('SAGA_FETCH_USER', fetchUser);
    yield takeLatest('SAGA_ADD_SONG_TO_LIBRARY', addSongToLibrary);
}


function* fetchAlbums(action) {
    yield put({type: 'FETCH_ALBUMS_PENDING'});

    const result = yield axios.get(`https://api.spotify.com/v1/me/albums`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res =>{
        return res;
        }

    );
    yield put({type:'FETCH_ALBUMS_SUCCESS',value:result.data.items});
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


function* fetchCategories(action){
    const result = yield axios.get(`https://api.spotify.com/v1/browse/categories`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res => res);
    yield put({type:'FETCH_CATEGORIES_SUCCESS', value:result.data.categories});
}


function* fetchNewReleases(action){
    const result = yield axios.get(`https://api.spotify.com/v1/browse/new-releases`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res => res);
    yield put( {
        type: 'FETCH_NEW_RELEASES_SUCCESS',
        value:result.data.albums
    });
}

function* fetchFeatured(action){
    const result = yield axios.get(`https://api.spotify.com/v1/browse/featured-playlists`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res => res);
    yield put({
            type: 'FETCH_FEATURED_SUCCESS',
            value:result.data.playlists
        });
}

function* fetchPlaylistsMenu(action){
    yield put({type: 'FETCH_PLAYLIST_MENU_PENDING'});

    const result = yield axios.get(`https://api.spotify.com/v1/users/${action.value.userId}/playlists`,
        {headers: {'Authorization': 'Bearer ' + action.value.accessToken}}).then(res => {
            return res
    });
    yield put({
            type: 'FETCH_PLAYLIST_MENU_SUCCESS',
            value: result.data.items
        });
}

function* fetchPlaylistSongs(action){

    yield put({type: 'FETCH_PLAYLIST_SONGS_PENDING'});
    const result = yield axios.get(`https://api.spotify.com/v1/users/${action.value.userId}/playlists/${action.value.playlistId}/tracks`,
        {headers: {'Authorization': 'Bearer ' + action.value.accessToken}}).then(res => {
        //remove duplicate tracks
        let items = res.data.items.filter((item)=> item.track && item.track.id);
        res.items = uniqBy(items, (item) => item.track.id);
        return res;
    });

    yield put({
        type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
        value:result.items
    })

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

function* fetchUser(action){

    const result = yield axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + action.value
        }
    }).then(res => res);

    yield put({
        type: 'FETCH_USER_SUCCESS',
        value:result.data
    })
}

function* addSongToLibrary(action){

    const result = yield axios.get(`https://api.spotify.com/v1/me/tracks?ids=${action.value.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + action.value.accessToken
        }
    }).then(res => {
        if(res.data.ok) {
            return action.value.id;
        }
    });

    yield put({
        type: 'ADD_SONG_TO_LIBRARY_SUCCESS',
        value:result
    })
}
