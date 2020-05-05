let express = require('express');
let kuromoji = require('kuromoji');
let router = express.Router();

let builder = kuromoji.builder({
    //dicPath: 'node_modules/kuromoji/dict'
    dicPath: 'public/dict'
});

router.post('/kuromoji', (req,res)=>{
    let q = req.body.q ? req.body.q : "今日は森へ行った";
    builder.build((err, tokenizer)=>{
        if(err) {throw err;}
        let tokens = tokenizer.tokenize(q);
        res.send(tokens);
    });
});

module.exports = router;
