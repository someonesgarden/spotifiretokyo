/* eslint-disable */

import axios from 'axios'
import { takeLatest, put} from 'redux-saga/dist/redux-saga-effects-npm-proxy.esm'
import uniqBy from "lodash/uniqBy";

import {BASE_URL} from '../../../redux/site';


export default function* spotifyWatcher() {
    yield takeLatest('SAGA_FETCH_CATEGORIES', fetchCategories);
    yield takeLatest('SAGA_FETCH_NEW_RELEASES', fetchNewReleases);
    yield takeLatest('SAGA_FETCH_FEATURED', fetchFeatured);
    yield takeLatest('SAGA_FETCH_CAT_PLAYLISTS', fetchCatPlaylists);
}


function* fetchCatPlaylists(action){

    let headers = {'Authorization': 'Bearer ' + action.value.accessToken};
    const result = yield axios.get(`${BASE_URL}/spotify/browse/categories/${action.value.genre}/playlists`,
        {headers: headers}).then(res =>res.data).catch(err=>err.message);

    yield
        console.log("res",result);
        yield put({type: 'UPDATE_VIEW_TYPE', value: 'genreplaylist'});
        yield put({type: 'FETCH_CAT_PLAYLISTS_SUCCESS', value: result.playlists});

    //yield put({type:'FETCH_CATEGORIES_SUCCESS', value:result.data.categories});
}


function* fetchCategories(action){
    const result = yield axios.get(`${BASE_URL}/spotify/browse/categories`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res => res);
    yield put({type:'FETCH_CATEGORIES_SUCCESS', value:result.data.categories});
}


function* fetchNewReleases(action){
    const result = yield axios.get(`${BASE_URL}/spotify/browse/new-releases`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res => res);
    yield put( {
        type: 'FETCH_NEW_RELEASES_SUCCESS',
        value:result.data.albums
    });
}

function* fetchFeatured(action){
    const result = yield axios.get(`${BASE_URL}/spotify/browse/featured-playlists`,
        {headers: {'Authorization': 'Bearer ' + action.value}}).then(res => res);
    yield put({
            type: 'FETCH_FEATURED_SUCCESS',
            value:result.data.playlists
        });
}
