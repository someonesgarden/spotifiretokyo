let express = require('express');
let router = express.Router();
const common = require('../../common');

router.get('/:playlistId', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId, 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/:playlistId/tracks', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId+ '/tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});


//followPlaylist
router.get('/:playlistId/followers', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId + '/followers', 'put', null, req,(result)=>{
        res.send(result);
    });
});

//unfollowPlaylist
router.get('/:playlistId/followers/del', (req,res)=>{
    let playlistId = req.params.playlistId;
    common.execApi('/v1/playlists/' + playlistId + '/followers', 'del', null, req,(result)=>{
        res.send(result);
    });
});

//changePlaylistDetails
router.post('/:playlistId', (req,res)=>{
    let playlistId = req.params.playlistId;
    let options = req.body.options;
    common.execApi('/v1/playlists/' + playlistId, 'put', options, req,(result)=>{
        res.send(result);
    });
});

//uploadCustomPlaylistCoverImage
router.post('/:playlistId/images', (req,res)=>{
    let playlistId = req.params.playlistId;
    let base64URI = req.body.base64URI;
    common.execImageApi('/v1/playlists/' + playlistId + '/images', 'put', base64URI, req,(result)=>{
        res.send(result);
    });
});

//addTracksToPlaylist
router.post('/:playlistId/tracks', (req,res)=>{
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
router.post('/:playlistId/tracks/del', (req,res)=>{
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
router.post('/:playlistId/tracks/delbyposition', (req,res)=>{
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
router.post('/:playlistId/tracks/replace', (req,res)=>{
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
router.post('/:playlistId/tracks/reorder', (req,res)=>{
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


module.exports = router;
