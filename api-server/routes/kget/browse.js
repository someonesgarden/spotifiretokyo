let express     = require('express');
let router      = express.Router();
let cheerio = require('cheerio-httpcli');

//id:'ab2528d9-719f-4261-8098-21849222a0f2'
////7
router.get('/spider',(req,res)=>{
    const artist   = req.query.artist;
    const song     = req.query.song;

    let links = [];
    let params = {c:0,r:artist,t:song};

    //let kget_url = "http://www.kget.jp/search/index.php?c=0&r="+artist+"&t="+song;
    let kget_url = "http://www.kget.jp/search/index.php";

    cheerio.fetch(kget_url,params,(err,$,res2)=>{
        if(err) { console.log("error"); res.send(null); }
        $("ul.songlist a.lyric-anchor").each(function(idx){links.push($(this).attr('href'))});

        if(links.length>0){
            cheerio.fetch('http://www.kget.jp'+links[0],params,(err,$$,res3)=>{

                let lyrics = "";
                $$("#lyric-trunk").each(function(idx){lyrics = $$(this).text()});

                res.send({lyrics:lyrics,link:'http://www.kget.jp'+links[0]});//lyric-trunk
            });
        }else{
            res.send(null);
        }

        //res.send(JSON.stringify(links));
    });

});


module.exports = router;
