let express = require('express');
let router = express.Router();
const common = require('../../common');

router.get('/', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/artists', 'get',options, req,(result)=>{
        res.send(result);
    });
});

router.get('/:artistId/top-tracks', (req,res)=>{
    let artistId = req.params.artistId;
    const options = {
        country:'US'
    };

    common.execApi('/v1/artists/' + artistId + '/top-tracks', 'get', options, req,(result)=>{
        res.send(result);
    });
});

router.get('/:artistId', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

router.get('/:artistId/albums', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId + '/albums', 'get',null, req,(result)=>{
        res.send(result);
    });
});


router.get('/:albumId/tracks', (req,res)=>{
    let albumId = req.params.albumId;
    common.execApi('/v1/albums/' + encodeURIComponent(albumId) + '/tracks', 'get',null, req,(result)=>{
        res.send(result);
    });
});





router.get('/:artistId/related-artists', (req,res)=>{
    let artistId = req.params.artistId;
    common.execApi('/v1/artists/' + artistId + '/related-artists', 'get',null, req,(result)=>{
        res.send(result);
    });
});

module.exports = router;
