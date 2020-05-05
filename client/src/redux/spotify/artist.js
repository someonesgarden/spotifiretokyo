const ActionType = {
  SET_ARTIST_IDS:'SET_ARTIST_IDS',
  SAGA_FETCH_ARTISTS:'SAGA_FETCH_ARTISTS',
  SAGA_FETCH_ARTIST_SONGS:'SAGA_FETCH_ARTIST_SONGS',
  FETCH_ARTISTS_PENDING:'FETCH_ARTISTS_PENDING',
  FETCH_ARTISTS_SUCCESS:'FETCH_ARTISTS_SUCCESS',
  FETCH_ARTISTS_ERROR:'FETCH_ARTISTS_ERROR',
  FETCH_ARTIST_SONGS_PENDING:'FETCH_ARTIST_SONGS_PENDING',
  FETCH_ARTIST_SONGS_SUCCESS:'FETCH_ARTIST_SONGS_SUCCESS',
  FETCH_ARTIST_SONGS_ERROR:'FETCH_ARTIST_SONGS_ERROR',
};


const store = {
  artistIds: ''
};


const reducer = {
  [ActionType.SET_ARTIST_IDS]: (payload) => {
    store.artistIds = payload.value;
    return {
      ...payload.state.artistsReducer,
      ...store
    }

  },

  [ActionType.FETCH_ARTISTS_PENDING]: (payload) => {
    store.fetchArtistsPending = true;
    return {
      ...payload.state.artistsReducer,
      ...store
    }
  },

  [ActionType.FETCH_ARTISTS_SUCCESS]: (payload) => {
    store.artistList = payload.value;
    store.fetchArtistsError = false;
    store.fetchArtistsPending = false;
    return {
      ...payload.state.artistsReducer,
      ...store
    }
  },

  [ActionType.FETCH_ARTISTS_ERROR]: (payload) => {
    store.fetchArtistsError = true;
    store.fetchArtistsPending = false;
    return {
      ...payload.state.artistsReducer,
      ...store
    }
  }
};


export default {
  store,
  reducer,
  ActionType
}


