import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_CATEGORIES', fetchCategories);
    yield takeLatest('SAGA_FETCH_NEW_RELEASES', fetchNewReleases);
    yield takeLatest('SAGA_FETCH_FEATURED', fetchFeatured);
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
