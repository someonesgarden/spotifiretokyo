let express = require('express');
let router = express.Router();
const common = require('../../common');


router.get('/:userId', (req,res)=>{
    let userId = req.params.userId;
    common.execApi('/v1/users/' + encodeURIComponent(userId), 'get',null, req,(result)=>{
        res.send(result);
    });
});

router.get('/:userId/playlists', (req,res)=>{
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
router.post('/:userId/playlists', (req,res)=>{
    let userId  = req.params.userId;
    let options = req.body.options;
    common.execApi('/v1/users/' + encodeURIComponent(userId) + '/playlists', 'post', options, req,(result)=>{
        res.send(result);
    });
});


//areFollowingPlaylist
router.get( '/:userId/playlists/:playlistId/followers/contains', (req,res)=>{
    let userId  = req.params.userId;
    let playlistId = req.params.playlistId;

    const ids = req.query.followerIds; //comma separated
    const options   = {ids:ids};

    common.execApi('/v1/users/' + encodeURIComponent(userId) + '/playlists/' + playlistId +
        '/followers/contains', 'get', options, req,(result)=>{
        res.send(result);
    });
});

module.exports = router;
