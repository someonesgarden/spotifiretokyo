/* eslint-disable */
//import uniqBy from 'lodash/uniqBy';

const ActionType = {
  UPDATE_VIEW_TYPE:'UPDATE_VIEW_TYPE',
  FETCH_SONGS_PENDING:'FETCH_SONGS_PENDING',
  FETCH_SONGS_SUCCESS:'FETCH_SONGS_SUCCESS',
  FETCH_SONGS_ERROR:'FETCH_SONGS_ERROR',
  SEARCH_SONGS_PENDING:'SEARCH_SONGS_PENDING',
  SEARCH_SONGS_SUCCESS:'SEARCH_SONGS_SUCCESS',
  SEARCH_SONGS_ERROR:'SEARCH_SONGS_ERROR',
  FETCH_RECENTLY_PLAYED_PENDING:'FETCH_RECENTLY_PLAYED_PENDING',
  FETCH_RECENTLY_PLAYED_SUCCESS:'FETCH_RECENTLY_PLAYED_SUCCESS',
  FETCH_RECENTLY_PLAYED_ERROR:'FETCH_RECENTLY_PLAYED_ERROR',
  FETCH_PLAYLIST_SONGS_PENDING:'FETCH_PLAYLIST_SONGS_PENDING',
  FETCH_PLAYLIST_SONGS_SUCCESS:'FETCH_PLAYLIST_SONGS_SUCCESS',
  FETCH_PLAYLIST_SONGS_ERROR:'FETCH_PLAYLIST_SONGS_ERROR',
  FETCH_ARTIST_SONGS_PENDING:'FETCH_ARTIST_SONGS_PENDING',
  FETCH_ARTIST_SONGS_SUCCESS:'FETCH_ARTIST_SONGS_SUCCESS',
  FETCH_ARTIST_SONGS_ERROR:'FETCH_ARTIST_SONGS_ERROR',

  PLAY_SONG:'PLAY_SONG',
  STOP_SONG:'STOP_SONG',
  PAUSE_SONG:'PAUSE_SONG',
  RESUME_SONG:'RESUME_SONG',
  INCREASE_SONG_TIME:'INCREASE_SONG_TIME',
  SAGA_FETCH_SONGS:'SAGA_FETCH_SONGS',
  SAGA_SEARCH_SONGS:'SAGA_SEARCH_SONGS',
  SAGA_FETCH_RECENTLY_PLAYED:'SAGA_FETCH_RECENTLY_PLAYED'
};

let store = {
  fetchSongsPending: true,
  songPlaying: false,
  timeElapsed: 0,
  songId: 0,
  viewType:'songs',
  songPaused: true
};


const reducer = {
  [ActionType.UPDATE_VIEW_TYPE]: (payload) => {
    store.viewType = payload.value;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_SONGS_PENDING]: (payload) => {
    store.fetchSongsPending = true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_SONGS_SUCCESS]: (payload) => {
    store.songs = payload.value;
    store.fetchSongsError= false;
    store.fetchSongsPending= false;
    store.viewType= 'songs';
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_SONGS_ERROR]: (payload) => {
    store.fetchSongsError = true;
    store.fetchSongsPending = false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.SEARCH_SONGS_PENDING]: (payload) => {
    store.searchSongsPending = true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.SEARCH_SONGS_SUCCESS]: (payload) => {
    store.songs = payload.value;
    store.searchSongsError = false;
    store.searchSongsPending = false;
    store.viewType = 'search';
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.SEARCH_SONGS_ERROR]: (payload) => {
    store.searchSongsError = true;
    store.searchSongsPending = false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_RECENTLY_PLAYED_PENDING]: (payload) => {
    store.fetchSongsPending = true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },
  [ActionType.FETCH_RECENTLY_PLAYED_SUCCESS]: (payload) => {
    store.songs = payload.value;
    store.viewType = 'Recently Played';
    store.fetchSongsError = false;
    store.fetchSongsPending = false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_RECENTLY_PLAYED_ERROR]: (payload) => {
    store.fetchSongsError = true;
    store.fetchSongsPending = false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_PLAYLIST_SONGS_PENDING]: (payload) => {
    store.fetchPlaylistSongsPending= true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_PLAYLIST_SONGS_SUCCESS]: (payload) => {
    store.songs = payload.value;
    store.viewType= 'playlist';
    store.fetchPlaylistSongsError= false;
    store.fetchPlaylistSongsPending= false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_PLAYLIST_SONGS_ERROR]: (payload) => {
    store.fetchPlaylistSongsError=true;
    store.fetchPlaylistSongsPending=false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_ARTIST_SONGS_PENDING]: (payload) => {
    store.fetchArtistSongsPending = true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_ARTIST_SONGS_SUCCESS]: (payload) => {
    store.songs = payload.value;
    store.viewType= 'Artist';
    store.fetchArtistSongsError= false;
    store.fetchArtistSongsPending= false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.FETCH_ARTIST_SONGS_ERROR]: (payload) => {
    store.fetchArtistSongsError= true;
    store.fetchArtistSongsPending= false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.PLAY_SONG]: (payload) => {
    store.songPlaying = true;
    store.songDetails = payload.value;
    store.songId = payload.value.id;
    store.timeElapsed = 0;
    store.songPaused = false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.STOP_SONG]: (payload) => {
    store.songPlaying = false;
    store.songDetails = null;
    store.timeElapsed = 0;
    store.songPaused = true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.PAUSE_SONG]: (payload) => {
    store.songPaused = true;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },

  [ActionType.RESUME_SONG]: (payload) => {
    store.songPaused = false;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  },
  [ActionType.INCREASE_SONG_TIME]: (payload) => {
    store.timeElapsed = payload.value;
    return {
      ...payload.state.songsReducer,
      ...store
    }
  }
};


export default {
  store,
  reducer,
  ActionType
}
