let express     = require('express');
let cheerio     = require('cheerio-httpcli');
let URL         = require('url');
let router      = express.Router();
const keys      = require('../../keys');
let musixmatch  = require('musicmatch')({apikey:keys.musixmatchKey});

//mbid:MusicbrainzのIDとマッチング
router.get('/albumTracks', (req,res)=>{
    const mbid   = req.query.mbid;
    musixmatch.albumTracks({album_mbid:mbid, page:1, page_size:2})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});







module.exports = router;
