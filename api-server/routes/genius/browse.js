let express = require('express');
let cheerio = require('cheerio-httpcli');
let URL     = require('url');
let router  = express.Router();
const keys  = require('../../keys');
const GeniusAPi = require('genius-api');
const genius = new GeniusAPi(keys.geniusAccessToken);

router.get('/search', (req,res)=>{
    const q = req.query.q;
    genius.search(q).then(data => res.send(data.hits)).catch((error) => {
        console.log('Genius Search Error', error.message);
        res.send(null);
    });
});

router.get('/artist', (req,res)=>{
    const id   = req.query.id;
    genius.artist(id).then(function (data) {
        res.send(data);
    }).catch((error) => {
        console.log('Genius Get Artist Error', error.message);
        res.send(null);
    });
});

//378195
router.get('/song', (req,res)=>{
    const id   = req.query.id;
    genius.song(id).then(data => res.send(data)).catch((error) => {
        console.log('Genius Get Song Error', error.message);
        res.send(null);
    });
});

router.get('/lyricsbyurl', (req,res)=>{
    const url   = req.query.url;
    let param = {};
    let lyrics = null;
    cheerio.fetch(url,param,(err,$,res2)=>{
       if(err) { console.log("error"); res.send(null); }
       $("div.lyrics").each(function(idx){ lyrics=$(this).text()});
       res.send(JSON.stringify(lyrics));
    });
});


module.exports = router;
