let express = require('express');
let router = express.Router();
const common = require('../../common');


//getRecommendations
router.post('/', (req,res)=>{
    let options = req.params.options;

    var _opts = {};
    var optionsOfTypeArray = ['seed_artists', 'seed_genres', 'seed_tracks'];
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            if (
                optionsOfTypeArray.indexOf(option) !== -1 &&
                Object.prototype.toString.call(options[option]) === '[object Array]'
            ) {
                _opts[option] = options[option].join(',');
            } else {
                _opts[option] = options[option];
            }
        }
    }
    common.execApi('/v1/recommendations', 'get', _opts, req,(result)=>{
        res.send(result);
    });
});

//getAvailableGenreSeeds
router.get('/available-genre-seeds', (req,res)=>{
    common.execApi('/v1/recommendations/available-genre-seeds', 'get',null, req,(result)=>{
        res.send(result);
    });
});



module.exports = router;
