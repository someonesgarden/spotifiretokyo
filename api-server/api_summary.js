let express = require('express');
let router = express.Router();
const common = require('./common');

//Me
router.get('/me', (req,res)=>{
    common.execApi('/v1/me', 'get',null, req,(result)=>{
        res.send(result);
    });
});

//getMySavedTracks
router.get('/me/tracks', (req,res)=>{
    common.execApi('/v1/me/tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});

//containsMySavedTracks
router.get('/me/tracks/contains', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/me/tracks/contains', 'get',options, req,(result)=>{
        res.send(result);
    });
});

//removeFromMySavedTracks
router.get('/me/tracks/remove', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/me/tracks', 'del',options, req,(result)=>{
        res.send(result);
    });
});

//addToMySavedTracks
router.get('/me/tracks/add', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/me/tracks', 'put',options, req,(result)=>{
        res.send(result);
    });
});

//removeFromMySavedAlbums
router.get('/me/albums/del', (req,res)=>{
    const ids = req.query.ids; //comma separated
    common.execApi('/v1/me/albums', 'del',ids, req,(result)=>{
        res.send(result);
    });
});

//addToMySavedAlbum
router.get('/me/albums/add', (req,res)=>{
    const ids = req.query.ids; //comma separated
    common.execApi('/v1/me/albums', 'put',ids, req,(result)=>{
        res.send(result);
    });
});

//getMySavedAlbums
router.get('/me/albums', (req,res)=>{
    common.execApi('/v1/me/albums', 'get',null, req,(result)=>{
        res.send(result);
    });
});

//containsMySavedAlbums
router.get('/me/albums/contains', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {ids};
    common.execApi('/v1/me/albums/contains', 'get', options, req,(result)=>{
        res.send(result);
    });
});

//getMyTopArtists
router.get('/me/top/artists', (req,res)=>{
    common.execApi('/v1/me/top/artists', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyTopTracks
router.get('/me/top/tracks', (req,res)=>{
    common.execApi('/v1/me/top/tracks', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyRecentlyPlayedTracks
router.get('/me/player/recently-played', (req,res)=>{
    common.execApi('/v1/me/player/recently-played', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyDevices
router.get('/me/player/devices', (req,res)=>{
    common.execApi('/v1/me/player/devices', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyCurrentPlayingTrack
router.get('/me/player/currently-playing', (req,res)=>{
    common.execApi('/v1/me/player/currently-playing', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyCurrentPlaybackState
router.get('/me/player', (req,res)=>{
    common.execApi('/v1/me/player', 'get', null, req,(result)=>{
        res.send(result);
    });
});


//transferMyPlayback
router.get('/me/player/transfer', (req,res)=>{
    const deviceIds = req.query.deviceIds; //comma separated
    const play = req.query.play;
    const options   = {
        device_ids: deviceIds,
        play: !!play
    };
    common.execApi('/v1/me/player', 'put',options, req,(result)=>{
        res.send(result);
    });
});

//play
router.get('/me/player/play', (req,res)=>{
    const device_id = req.query.device_id; //comma separated
    var queryParams = device_id ? { device_id: device_id } : null;
    var postData = {};
    var _options = {};
    ['context_uri', 'uris', 'offset'].forEach(function(field) {
        if (field in _options) {
            postData[field] = _options[field];
        }
    });
    common.execPlayerApi('/v1/me/player/play', 'put', queryParams, postData, req,(result)=>{
        res.send(result);
    });
});

//pause
router.get('/me/player/pause', (req,res)=>{
    const device_id = req.query.device_id; //comma separated
    const queryParams = device_id ? { device_id: device_id } : null;

    common.execApi('/v1/me/player/pause', 'put', queryParams, req,(result)=>{
        res.send(result);
    });
});

//skipToPrevious
router.get('/me/player/previous', (req,res)=>{
    common.execApi('/v1/me/player/previous', 'post', null, req,(result)=>{
        res.send(result);
    });
});

//skipToNext
router.get('/me/player/next', (req,res)=>{
    common.execApi('/v1/me/player/next', 'post', null, req,(result)=>{
        res.send(result);
    });
});

//seek
router.get('/me/player/seek', (req,res)=>{
    const options = req.query.options;

    var params = {
        position_ms: req.query.positionMs
    };
    if (options && 'device_id' in options) {
        params.device_id = options.device_id;
    }

    common.execApi('/v1/me/player/seek', 'put', params, req,(result)=>{
        res.send(result);
    });
});

//setRepeat
router.get('/me/player/repeat', (req,res)=>{

    const options = {
        state: req.query.state || 'off'
    };

    common.execApi('/v1/me/player/repeat', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//setShuffle
router.get('/me/player/shuffle', (req,res)=>{
    const options = {
        state: req.query.state || 'false'
    };
    common.execApi('/v1/me/player/shuffle', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//setVolume
router.get('/me/player/volume', (req,res)=>{
    var options = {
        volume_percent: req.query.volumePercent
    };

    if (req.query.device_id) {options.device_id = req.query.device_id;}
    common.execApi('/v1/me/player/volume', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//followUsers or Artists
router.get('/me/following/put/:type', (req,res)=>{
    let type = req.params.type || 'user';
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids,
        type: type
    };

    common.execApi('/v1/me/following', 'put', options, req,(result)=>{
        res.send(result);
    });
});


//getFollowedArtists
router.get('/me/following/artists', (req,res)=>{
    const options   = {
        type: 'artist'
    };
    common.execApi('/v1/me/following', 'get', options, req,(result)=>{
        res.send(result);
    });
});


//unfollowUsers or Artists
router.get('/me/following/del/:type', (req,res)=>{
    let type = req.params.type || 'user';
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids,
        type: type
    };

    common.execApi('/v1/me/following', 'del', options, req,(result)=>{
        res.send(result);
    });
});


//isFollowingUsers or Artists
router.get('/me/following/contains/:type', (req,res)=>{
    const ids = req.query.ids; //comma separated
    let type = req.params.type || 'user';
    const options   = {
        type: type,
        ids:ids
    };
    common.execApi('/v1/me/following/contains', 'get', options, req,(result)=>{
        res.send(result);
    });
});

//Tracks
router.get('/tracks/:trackId', (req,res)=>{
    let trackId = req.params.trackId;
    common.execApi('/v1/tracks/' + trackId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

router.get('/tracks', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/tracks', 'get',options, req,(result)=>{
        res.send(result);
    });
});




//Albums
router.get('/albums/:albumId', (req,res)=>{
    let albumId = req.params.albumId;
    common.execApi('/v1/albums/' + albumId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

router.get('/albums', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/albums', 'get',options, req,(result)=>{
        res.send(result);
    });
});

//Artists

router.get('/artists/:artistId', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

router.get('/artists', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/artists', 'get',options, req,(result)=>{
        res.send(result);
    });
});

router.get('/artists/:artistId/albums', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId + '/albums', 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/artists/:albumId/tracks', (req,res)=>{
    let albumId = req.params.albumId;
    common.execApi('/v1/albums/' + albumId + '/tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/artists/:artistId/top-tracks', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId + '/top-tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/artists/:artistId/related-artists', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId + '/related-artists', 'get',null, req,(result)=>{
        res.send(result);
    });
});


//Users
router.get('/users/:userId', (req,res)=>{
    let userId = req.params.userId;
    common.execApi('/v1/users/' + encodeURIComponent(userId), 'get',null, req,(result)=>{
        res.send(result);
    });
});

router.get('/users/:userId/playlists', (req,res)=>{
    let userId  = req.params.userId;
    let options = {};
    let path    = "";

    if (typeof userId === 'string') {
        path = '/v1/users/' + encodeURIComponent(userId) + '/playlists';
    } else if (typeof userId === 'object') {
        options = userId;
        path = '/v1/me/playlists';
    } /* undefined */ else {
        path = '/v1/me/playlists';
    }

    common.execApi(path, 'get',options, req,(result)=>{
        res.send(result);
    });
});

//createPlaylist
router.post('/users/:userId/playlists', (req,res)=>{
    let userId  = req.params.userId;
    let options = req.body.options;
    common.execApi('/v1/users/' + encodeURIComponent(userId) + '/playlists', 'post', options, req,(result)=>{
        res.send(result);
    });
});


//areFollowingPlaylist
router.get( '/users/:userId/playlists/:playlistId/followers/contains', (req,res)=>{
    let userId  = req.params.userId;
    let playlistId = req.params.playlistId;

    const ids = req.query.followerIds; //comma separated
    const options   = {ids:ids};

    common.execApi('/v1/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId +
        '/followers/contains', 'get', options, req,(result)=>{
        res.send(result);
    });
});



router.get('/playlists/:playlistId', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId, 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/playlists/:playlistId/tracks', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId+ '/tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});


//followPlaylist
router.get('/playlists/:playlistId/followers', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId + '/followers', 'put', null, req,(result)=>{
        res.send(result);
    });
});

//unfollowPlaylist
router.get('/playlists/:playlistId/followers/del', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId + '/followers', 'del', null, req,(result)=>{
        res.send(result);
    });
});

//changePlaylistDetails
router.post('/playlists/:playlistId', (req,res)=>{
    let playlistId = req.params.playlistId;
    let options = req.body.options;
    common.execApi('/v1/playlists/' + playlistId, 'put', options, req,(result)=>{
        res.send(result);
    });
});

//uploadCustomPlaylistCoverImage
router.post('/playlists/:playlistId/images', (req,res)=>{
    let playlistId = req.params.playlistId;
    let base64URI = req.body.base64URI;
    common.execImageApi('/v1/playlists/' + playlistId + '/images', 'put', base64URI, req,(result)=>{
        res.send(result);
    });
});

//addTracksToPlaylist
router.post('/playlists/:playlistId/tracks', (req,res)=>{
    let playlistId = req.params.playlistId;
    let tracks = req.body.tracks;
    const options   = {
        uris:tracks
    };
    common.execApi('/v1/playlists/' + playlistId + '/tracks', 'post', options, req,(result)=>{
        res.send(result);
    });
});

//removeTracksFromPlaylist
router.post('/playlists/:playlistId/tracks/del', (req,res)=>{
    let playlistId = req.params.playlistId;
    let tracks = req.body.tracks;
    const options   = {
        uris:tracks
    };
    common.execApi('/v1/playlists/' + playlistId + '/tracks', 'del', options, req,(result)=>{
        res.send(result);
    });
});

//removeTracksFromPlaylistByPosition
router.post('/playlists/:playlistId/tracks/delbyposition', (req,res)=>{
    let playlistId = req.params.playlistId;
    let positions = req.body.positions;
    let snapshotId = req.body.snapshotId;
    const options   = {
        positions: positions,
        snapshot_id: snapshotId
    }
    common.execApi('/v1/playlists/' + playlistId + '/tracks', 'del', options, req,(result)=>{
        res.send(result);
    });
});

//replaceTracksInPlaylist
router.post('/playlists/:playlistId/tracks/replace', (req,res)=>{
    let playlistId = req.params.playlistId;
    let tracks = req.body.tracks;
    const options   = {
        uris:tracks
    };
    common.execApi('/v1/playlists/' + playlistId + '/tracks', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//reorderTracksInPlaylist
router.post('/playlists/:playlistId/tracks/reorder', (req,res)=>{
    let playlistId = req.params.playlistId;
    let rangeStart = req.body.rangeStart;
    let insertBefore = req.body.insertBefore;
    const options   =  {
        range_start: rangeStart,
        insert_before: insertBefore
    };
    common.execApi('/v1/playlists/' + playlistId + '/tracks', 'put', options, req,(result)=>{
        res.send(result);
    });
});



//Browse

//getNewReleases
router.get('/browse/new-releases', (req,res)=>{
    common.execApi('/v1/browse/new-releases', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getFeaturedPlaylists
router.get('/browse/featured-playlists', (req,res)=>{
    common.execApi('/v1/browse/featured-playlists', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getCategories
router.get('/browse/categories', (req,res)=>{
    common.execApi('/v1/browse/categories', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getCategory
router.get('/browse/categories/:categoryId', (req,res)=>{
    let categoryId  = req.params.categoryId;
    common.execApi('/v1/browse/categories/' + categoryId, 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getPlaylistsForCategory
router.get('/browse/categories/:categoryId/playlists', (req,res)=>{
    let categoryId  = req.params.categoryId;
    common.execApi('/v1/browse/categories/' + categoryId + '/playlists', 'get', null, req,(result)=>{
        res.send(result);
    });
});



//getRecommendations
router.post('/recommendations', (req,res)=>{
    let options = req.params.options;

    var _opts = {};
    var optionsOfTypeArray = ['seed_artists', 'seed_genres', 'seed_tracks'];
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            if (
                optionsOfTypeArray.indexOf(option) !== -1 &&
                Object.prototype.toString.call(options[option]) === '[object Array]'
            ) {
                _opts[option] = options[option].join(',');
            } else {
                _opts[option] = options[option];
            }
        }
    }
    common.execApi('/v1/recommendations', 'get', _opts, req,(result)=>{
        res.send(result);
    });
});

//getAvailableGenreSeeds
router.get('/recommendations/available-genre-seeds', (req,res)=>{
    common.execApi('/v1/recommendations/available-genre-seeds', 'get',null, req,(result)=>{
        res.send(result);
    });
});









//getAudioFeaturesForTrack
router.get('/audio-features/:trackId', (req,res)=>{
    let trackId = req.params.trackId;
    common.execApi('/v1/audio-features/' + trackId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

//getAudioFeaturesForTracks
router.get('/audio-features', (req,res)=>{
    const options = {
        ids: req.query.ids  //comma separated
    };
    common.execApi('/v1/audio-features', 'get',options, req,(result)=>{
        res.send(result);
    });
});


//getAudioAnalysisForTrack
router.get('/audio-analysis/:trackId', (req,res)=>{
    let trackId = req.params.trackId;
    common.execApi('/v1/audio-analysis/' + trackId, 'get',null, req,(result)=>{
        res.send(result);
    });
});


//Search
router.get('/search', (req,res)=>{
    const types = req.query.types; //comma separated
    const q = req.query.q;
    const options = {
        type: types,
        q: q
    };
    common.execApi('/v1/search','get', options, req,(result)=>{
        res.send(result);
    });
});
