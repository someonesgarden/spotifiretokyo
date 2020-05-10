let express = require('express');
let router = express.Router();
const common = require('../../common');

//Search
router.get('/', (req,res)=>{
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

module.exports = router;
