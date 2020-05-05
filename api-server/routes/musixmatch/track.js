let express     = require('express');
let cheerio     = require('cheerio-httpcli');
let URL         = require('url');
let router      = express.Router();
const keys      = require('../../keys');
let musixmatch  = require('musicmatch')({apikey:keys.musixmatchKey});

router.get('/chartTracks', (req,res)=>{
    musixmatch.chartTracks({page:1, page_size:3, country:"jp"})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});

//mbid:MusicbrainzのIDとマッチング
router.get('/trackId',(req,res)=>{
    const mbid   = req.query.mbid;
    musixmatch.track({track_mbid:mbid})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
})

//mbid:MusicbrainzのIDとマッチング
///api/musixmatch/track/trackLyrics?mbid=01496293-9400-3b94-bec8-92dc74335c7c
router.get('/trackLyrics',(req,res)=>{

    if(req.query.mbid){
        const mbid   = req.query.mbid;
        musixmatch.trackLyrics({track_mbid:mbid})
            .then(function(data){
                console.log(data);
                res.send(data);
            }).catch(function(err){
            console.log(err);
            res.send(null);
        })
    }else {
        const trackid   = req.query.trackid;
        musixmatch.trackLyrics({track_id:trackid})
            .then(function(data){
                console.log(data);
                res.send(data);
            }).catch(function(err){
            console.log(err);
            res.send(null);
        })
    }


})





module.exports = router;
