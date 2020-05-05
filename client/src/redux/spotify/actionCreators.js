//ALBUMS

export const fetchAlbums = (accessToken) => {
	return {
		type:'SAGA_FETCH_ALBUMS',
		value:accessToken
	};
};

export const fetchAlbumsPending = () => {
	return {
		type: 'FETCH_ALBUMS_PENDING'
	};
};

export const fetchAlbumsSuccess = (albums) => {
	return {
		type: 'FETCH_ALBUMS_SUCCESS',
		value: albums
	};
};

export const fetchAlbumsError = () => {
	return {
		type: 'FETCH_ALBUMS_ERROR'
	};
};

//Artist
export const fetchArtists = (accessToken, artistIds) => {
    return {
        type:'SAGA_FETCH_ARTISTS',
        value:{
            accessToken,
            artistIds
        }
    };
};

export const fetchArtistSongs = (artistId, accessToken) => {
    return {
        type:'SAGA_FETCH_ARTIST_SONGS',
        value:{
            artistId,
            accessToken
        }
    }
};

export const fetchArtistsPending = () => {
    return {
        type: 'FETCH_ARTISTS_PENDING'
    };
};

export const fetchArtistsSuccess = (artists) => {
    return {
        type: 'FETCH_ARTISTS_SUCCESS',
        value:artists
    };
};

export const fetchArtistsError = () => {
    return {
        type: 'FETCH_ARTISTS_ERROR'
    };
};

export const fetchArtistSongsPending = () => {
    return {
        type: 'FETCH_ARTIST_SONGS_PENDING'
    };
};

export const fetchArtistSongsSuccess = (songs) => {
    return {
        type: 'FETCH_ARTIST_SONGS_SUCCESS',
        value:songs
    };
};

export const fetchArtistSongsError = () => {
    return {
        type: 'FETCH_ARTIST_SONGS_ERROR'
    };
};

export const setArtistIds = (artistIds) => {
    return {
        type: 'SET_ARTIST_IDS',
        value:artistIds
    };
};


//Browser
export const fetchCategories = (accessToken) => {
    return {
        type:'SAGA_FETCH_CATEGORIES',
        value:accessToken
    }
};

export const fetchNewReleases = (accessToken) => {
    return {
        type:'SAGA_FETCH_NEW_RELEASES',
        value:accessToken
    }
};

export const fetchFeatured = (accessToken) => {

    return {
        type:'SAGA_FETCH_FEATURED',
        value:accessToken
    }
};

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: 'FETCH_CATEGORIES_SUCCESS',
        value:categories
    };
};

export const fetchCategoriesError = () => {
    return {
        type: 'FETCH_CATEGORIES_ERROR'
    };
};

export const fetchNewReleasesSuccess = (newReleases) => {
    return {
        type: 'FETCH_NEW_RELEASES_SUCCESS',
        value:newReleases
    };
};

export const fetchNewReleasesError = () => {
    return {
        type: 'FETCH_NEW_RELEASES_ERROR'
    };
};

export const fetchFeaturedSuccess = (featured) => {
    return {
        type: 'FETCH_FEATURED_SUCCESS',
        value:featured
    };
};

export const fetchFeaturedError = () => {
    return {
        type: 'FETCH_FEATURED_ERROR'
    };
};

//Playlist

export const fetchPlaylistMenuPending = () => {
    return {
        type: 'FETCH_PLAYLIST_MENU_PENDING'
    };
};

export const fetchPlaylistMenuSuccess = (playlists) => {
    return {
        type: 'FETCH_PLAYLIST_MENU_SUCCESS',
        value:playlists
    };
};

export const fetchPlaylistMenuError = () => {
    return {
        type: 'FETCH_PLAYLIST_MENU_ERROR'
    };
};

export const addPlaylistItem = (playlist) => {
    return {
        type: 'ADD_PLAYLIST_ITEM',
        value:playlist
    };
};

export const fetchPlaylistSongsPending = () => {
    return {
        type: 'FETCH_PLAYLIST_SONGS_PENDING'
    };
};

export const fetchPlaylistSongsSuccess = (songs) => {
    return {
        type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
        value:songs
    };
};

export const fetchPlaylistSongsError = () => {
    return {
        type: 'FETCH_PLAYLIST_SONGS_ERROR'
    };
};

export const fetchPlaylistsMenu = (userId, accessToken) => {
    return {
        type:'SAGA_FETCH_PLAYLIST_MENU',
        value:{
            userId,
            accessToken
        }
    }
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
    return {
        type:'SAGA_FETCH_PLAYLIST_SONGS',
        value:{
            userId,
            playlistId,
            accessToken
        }
    }
};

//Songs

export const fetchSongs = (accessToken) => {
    return {
        type:'SAGA_FETCH_SONGS',
        value:accessToken
    }
};

export const searchSongs = (searchTerm, accessToken) => {
    return {
        type:'SAGA_SEARCH_SONGS',
        value:{
            searchTerm,
            accessToken
        }
    }
};

export const fetchRecentlyPlayed = (accessToken) => {
    return {
        type:'SAGA_FETCH_RECENTLY_PLAYED',
        value: accessToken

    }
};

export const fetchSongsPending = () => {
    return {
        type: 'FETCH_SONGS_PENDING'
    };
};

export const fetchSongsSuccess = (songs) => {
    return {
        type: 'FETCH_SONGS_SUCCESS',
        value:songs
    };
};

export const fetchSongsError = () => {
    return {
        type: 'FETCH_SONGS_ERROR'
    };
};

export const searchSongsPending = () => {
    return {
        type: 'SEARCH_SONGS_PENDING'
    };
};

export const searchSongsSuccess = (songs) => {
    return {
        type: 'SEARCH_SONGS_SUCCESS',
        value:songs
    };
};

export const searchSongsError = () => {
    return {
        type: 'SEARCH_SONGS_ERROR'
    };
};

export const fetchRecentlyPlayedPending = () => {
    return {
        type: 'FETCH_RECENTLY_PLAYED_PENDING'
    };
};

export const fetchRecentlyPlayedSuccess = (songs) => {
    return {
        type: 'FETCH_RECENTLY_PLAYED_SUCCESS',
        value:songs
    };
};

export const fetchRecentlyPlayedError = () => {
    return {
        type: 'FETCH_RECENTLY_PLAYED_ERROR'
    };
};

export const playSong = (song) => {
    return {
        type: 'PLAY_SONG',
        value:song
    };
};

export const stopSong = () => {
    return {
        type: 'STOP_SONG'
    };
};

export const pauseSong = () => {
    return {
        type: 'PAUSE_SONG'
    };
};

export const resumeSong = () => {
    return {
        type: 'RESUME_SONG'
    };
};

export const increaseSongTime = (time) => {
    return {
        type: 'INCREASE_SONG_TIME',
        value:time
    };
};

export const updateViewType = (view) => {
    return {
        type: 'UPDATE_VIEW_TYPE',
        value:view
    };
};

//Sound

export const updateVolume = (volume) => {
    return {
        type: 'UPDATE_VOLUME',
        value:volume
    };
};

//Token

export const setToken = (token) => {
    console.log("set_TOKEN!!!");
    return {
        type: 'SET_TOKEN',
        value:token
    };
};

// User

export const fetchUser = (accessToken) => {
    return {
        type:'SAGA_FETCH_USER',
        value:accessToken
    }
};

export const addSongToLibrary = (accessToken, id) => {
    return {
        type:'SAGA_ADD_SONG_TO_LIBRARY',
        value:{
            accessToken,
            id
        }
    }
};

export const fetchUserSuccess = (user) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        value:user
    };
};

export const fetchUserError = () => {
    return {
        type: 'FETCH_USER_ERROR'
    };
};

export const addSongToLibrarySuccess = (songId) => {
    return {
        type: 'ADD_SONG_TO_LIBRARY_SUCCESS',
        value:songId
    };
};

export const addSongToLibraryError = () => {
    return {
        type: 'ADD_SONG_TO_LIBRARY_ERROR'
    };
};

//UI

export const updateHeaderTitle = (title) => {
    return {
        type: 'UPDATE_HEADER_TITLE',
        value:title
    };
};


