let express = require('express');
let router = express.Router();
const keys = require('../../keys');

router.get('/tokens',(req,res)=>{
    res.send({
        mapbox:keys.MAPBOX_TOKEN
    });
});

module.exports = router;
