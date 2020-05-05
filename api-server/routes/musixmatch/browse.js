let express     = require('express');
let cheerio     = require('cheerio-httpcli');
let URL         = require('url');
let router      = express.Router();
const keys      = require('../../keys');
let musixmatch  = require('musicmatch')({apikey:keys.musixmatchKey});


router.get('/trackSearch',(req,res)=>{
    const q   = req.query.q;
    musixmatch.trackSearch({q:q, page:1, page_size:3})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
})

//q_track:歌詞の中で検索するワード
//q_artist:アーティスト名
router.get('/matcherLyrics',(req,res)=>{
    const q_track   = req.query.q_track;
    const q_artist  = req.query.q_artist;
    musixmatch.matcherLyrics({q_track:q_track, q_artist:q_artist})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
})

//q_track:ソングのタイトル
//q_artist:アーティスト名
router.get('/matcherTrack',(req,res)=>{
    const q_track   = req.query.q_track;
    const q_artist  = req.query.q_artist
    musixmatch.matcherTrack({q_artist:q_artist, q_track:q_track})
        .then(function(data){
            console.log(data);
            res.send(data);
        }).catch(function(err){
        console.log(err);
        res.send(null);
    })
})





module.exports = router;
