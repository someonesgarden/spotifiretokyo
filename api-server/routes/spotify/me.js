let express = require('express');
let router = express.Router();
const common = require('../../common');

router.get('/', (req,res)=>{
    common.execApi('/v1/me', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMySavedTracks
router.get('/tracks', (req,res)=>{
    common.execApi('/v1/me/tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});

//containsMySavedTracks
router.get('/tracks/contains', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/me/tracks/contains', 'get',options, req,(result)=>{
        res.send(result);
    });
});

//removeFromMySavedTracks
router.get('/tracks/remove', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/me/tracks', 'del',options, req,(result)=>{
        res.send(result);
    });
});


//addToMySavedTracks
router.get('/tracks/add', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/me/tracks', 'put',options, req,(result)=>{
        res.send(result);
    });
});


//removeFromMySavedAlbums
router.get('/albums/del', (req,res)=>{
    const ids = req.query.ids; //comma separated
    common.execApi('/v1/me/albums', 'del',ids, req,(result)=>{
        res.send(result);
    });
});

//addToMySavedAlbum
router.get('/albums/add', (req,res)=>{
    const ids = req.query.ids; //comma separated
    common.execApi('/v1/me/albums', 'put',ids, req,(result)=>{
        res.send(result);
    });
});

//getMySavedAlbums
router.get('/albums', (req,res)=>{
    common.execApi('/v1/me/albums', 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/albums/contains', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {ids};
    common.execApi('/v1/me/albums/contains', 'get', options, req,(result)=>{
        res.send(result);
    });
});

//getMyTopArtists
router.get('/top/artists', (req,res)=>{
    common.execApi('/v1/me/top/artists', 'get', null, req,(result)=>{
        res.send(result);
    });
});

router.get('/top/tracks', (req,res)=>{
    common.execApi('/v1/me/top/tracks', 'get', null, req,(result)=>{
        res.send(result);
    });
});


//getMyRecentlyPlayedTracks
router.get('/player/recently-played', (req,res)=>{
    common.execApi('/v1/me/player/recently-played', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyDevices
router.get('/player/devices', (req,res)=>{
    common.execApi('/v1/me/player/devices', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyCurrentPlayingTrack
router.get('/player/currently-playing', (req,res)=>{
    common.execApi('/v1/me/player/currently-playing', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getMyCurrentPlaybackState
router.get('/player', (req,res)=>{
    common.execApi('/v1/me/player', 'get', null, req,(result)=>{
        res.send(result);
    });
});


//transferMyPlayback
router.get('/player/transfer', (req,res)=>{
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
router.get('/player/play', (req,res)=>{
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
router.get('/player/pause', (req,res)=>{
    const device_id = req.query.device_id; //comma separated
    const queryParams = device_id ? { device_id: device_id } : null;

    common.execApi('/v1/me/player/pause', 'put', queryParams, req,(result)=>{
        res.send(result);
    });
});

//skipToPrevious
router.get('/player/previous', (req,res)=>{
    common.execApi('/v1/me/player/previous', 'post', null, req,(result)=>{
        res.send(result);
    });
});

//skipToNext
router.get('/player/next', (req,res)=>{
    common.execApi('/v1/me/player/next', 'post', null, req,(result)=>{
        res.send(result);
    });
});

//seek
router.get('/player/seek', (req,res)=>{
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
router.get('/player/repeat', (req,res)=>{

    const options = {
        state: req.query.state || 'off'
    };

    common.execApi('/v1/me/player/repeat', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//setShuffle
router.get('/player/shuffle', (req,res)=>{
    const options = {
        state: req.query.state || 'false'
    };
    common.execApi('/v1/me/player/shuffle', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//setVolume
router.get('/player/volume', (req,res)=>{
    var options = {
        volume_percent: req.query.volumePercent
    };

    if (req.query.device_id) {options.device_id = req.query.device_id;}
    common.execApi('/v1/me/player/volume', 'put', options, req,(result)=>{
        res.send(result);
    });
});

//followUsers or Artists
router.get('/following/put/:type', (req,res)=>{
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
router.get('/following/artists', (req,res)=>{
    const options   = {
        type: 'artist'
    };
    common.execApi('/v1/me/following', 'get', options, req,(result)=>{
        res.send(result);
    });
});


//unfollowUsers or Artists
router.get('/following/del/:type', (req,res)=>{
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
router.get('/following/contains/:type', (req,res)=>{
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


module.exports = router;
