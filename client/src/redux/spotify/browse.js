/* eslint-disable */

const ActionType = {
  FETCH_CATEGORIES_SUCCESS:'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_ERROR:'FETCH_CATEGORIES_ERROR',
  FETCH_NEW_RELEASES_SUCCESS:'FETCH_NEW_RELEASES_SUCCESS',
  FETCH_NEW_RELEASES_ERROR:'FETCH_NEW_RELEASES_ERROR',
  FETCH_FEATURED_SUCCESS:'FETCH_FEATURED_SUCCESS',
  FETCH_FEATURED_ERROR:'FETCH_FEATURED_ERROR',
  SAGA_FETCH_CATEGORIES:'SAGA_FETCH_CATEGORIES',
  SAGA_FETCH_NEW_RELEASES:'SAGA_FETCH_NEW_RELEASES',
  SAGA_FETCH_FEATURED:'SAGA_FETCH_FEATURED',
  SAGA_FETCH_CAT_PLAYLISTS:'SAGA_FETCH_CAT_PLAYLISTS',
  FETCH_CAT_PLAYLISTS_SUCCESS:'FETCH_CAT_PLAYLISTS_SUCCESS'
};

let store = {};


const reducer = {
  [ActionType.FETCH_CATEGORIES_SUCCESS]: (payload) => {
    store.view = payload.value.items;
    store.fetchCategoriesError = false;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },

  [ActionType.FETCH_CATEGORIES_ERROR]:(payload) => {
    store.fetchCategoriesError = true;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },

  [ActionType.FETCH_NEW_RELEASES_SUCCESS]:(payload) => {
    store.view = payload.value.items;
    store.fetchNewReleasesError = false;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },

  [ActionType.FETCH_NEW_RELEASES_ERROR]:(payload) => {
    store.fetchNewReleasesError = true;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },

  [ActionType.FETCH_FEATURED_SUCCESS]:(payload) => {
    store.view = payload.value.items;
    store.fetchFeaturedError = false;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },

  [ActionType.FETCH_FEATURED_ERROR]:(payload) => {
    store.fetchFeaturedError = true;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },

  [ActionType.FETCH_CAT_PLAYLISTS_SUCCESS]:(payload) => {
    store.view = payload.value.items;
    store.fetchFeaturedError = false;
    return {
      ...payload.state.browseReducer,
      ...store
    }
  },
};



export default {
  store,
  reducer,
  ActionType
}


