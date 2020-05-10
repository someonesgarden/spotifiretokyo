let express = require('express');
let router = express.Router();
const common = require('../../common');

//Albums
router.get('/', (req,res)=>{
    const ids = req.query.ids; //comma separated
    const options   = {
        ids:ids
    };
    common.execApi('/v1/albums', 'get',options, req,(result)=>{
        res.send(result);
    });
});

router.get('/:albumId', (req,res)=>{
    let albumId = req.params.albumId;
    common.execApi('/v1/albums/' + albumId, 'get',null, req,(result)=>{
        res.send(result);
    });
});

module.exports = router;
