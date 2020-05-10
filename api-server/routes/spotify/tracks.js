let express = require('express');
let router = express.Router();
const common = require('../../common');

//Tracks
router.get('/', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/tracks', 'get',options, req,(result)=>{
        res.send(result);
    });
});

router.get('/:trackId', (req,res)=>{
    let trackId = req.params.trackId;
    common.execApi('/v1/tracks/' + trackId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

module.exports = router;
