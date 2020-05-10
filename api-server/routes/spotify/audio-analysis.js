let express = require('express');
let router = express.Router();
const common = require('../../common');


//getAudioAnalysisForTrack
router.get('/:trackId', (req,res)=>{
    let trackId = req.params.trackId;
    common.execApi('/v1/audio-analysis/' + trackId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

module.exports = router;
