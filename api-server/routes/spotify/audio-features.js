let express = require('express');
let router = express.Router();
const common = require('../../common');


//getAudioFeaturesForTracks
router.get('/', (req,res)=>{
    const options = {
        ids: req.query.ids  //comma separated
    };
    common.execApi('/v1/audio-features', 'get',options, req,(result)=>{
        res.send(result);
    });
});



//getAudioFeaturesForTrack
router.get('/:trackId', (req,res)=>{
    let trackId = req.params.trackId;
    common.execApi('/v1/audio-features/' + trackId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

module.exports = router;
