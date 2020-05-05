let express     = require('express');
let router      = express.Router();
let cheerio = require('cheerio-httpcli');

//id:'ab2528d9-719f-4261-8098-21849222a0f2'
////7
router.get('/spider',(req,res)=>{
    const word     = req.query.word;

    let words = [];
    let params = {word:word};

    let ruigo_url = "https://www.dictjuggler.net/ruigo/";

    cheerio.fetch(ruigo_url,params,(err,$,res2)=>{
        if(err) { console.log("error"); res.send(null); }

        $("div.wordList > p:first-child a").each(function(idx){words.push($(this).text())});

        if(words.length>0){
            res.send(words);
        }else{
            res.send([word]);
        }
    });

});


module.exports = router;
