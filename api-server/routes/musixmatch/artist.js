let express     = require('express');
let cheerio     = require('cheerio-httpcli');
let URL         = require('url');
let router      = express.Router();
const keys      = require('../../keys');
let musixmatch  = require('musicmatch')({apikey:keys.musixmatchKey});



router.get('/chartArtists', (req,res)=>{
    musixmatch.chartArtists({page:1, page_size:3, country:"jp"})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});

router.get('/artistSearch', (req,res)=>{
    const q_artist   = req.query.q_artist;
    musixmatch.artistSearch({q_artist:q_artist, page_size:5})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});

//mbid:MusicbrainzのIDとマッチング
router.get('/artistId', (req,res)=>{
    const mbid   = req.query.mbid;
    musixmatch.artist({artist_mbid:mbid})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});

//mbid:MusicbrainzのIDとマッチング
router.get('/artistAlbums', (req,res)=>{
    const mbid   = req.query.mbid;
    musixmatch.artistAlbums({artist_mbid:mbid, s_release_date:"desc", g_album_name:1})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});

//mbid:MusicbrainzのIDとマッチング
router.get('/artistRelated', (req,res)=>{
    const mbid   = req.query.mbid;
    musixmatch.artistRelated({artist_mbid:mbid, page_size:2, page:1})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
});



module.exports = router;
