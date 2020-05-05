let express     = require('express');
let router      = express.Router();
let {Lyrics}    = require('./model/lyrics');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/all', (req,res)=>{
    Lyrics.findAll().then(
        function(data) {
            res.send(data);
        },
        function(err) {
            console.log('get all lyrics error:', err.message);
            res.send(null);
        }
    );
});

//Lyricsの新規作成
router.post('/new', (req,res)=>{
    Lyrics.create({...req.body}).then((result) => {
            res.send(result);
        },
        (error) => {
            console.log("creat new lyrics", error.message);
            res.send(null);
        });
})

//Lyricsの検索
router.get('/get', (req,res)=>{
    const key          = req.query.key;
    const val          = req.query.val;

    let queries = {};
    queries[key] = {[Op.like]: '%'+val+'%'};
    console.log(queries);
    Lyrics.findAll({where: queries}).then((results) => {
            res.send(results);
        },
        (error) => {
            console.log("lyrics get error", error.message);
            res.send(null);
        });
})

router.get('/delete', (req,res)=>{
    const id          = req.query.id;
    //Lyrics.destroy({where: {id: id}}).on('success', (u)=>res.send('success'));

    Lyrics.destroy({
        where: {
            id: id
        }
    }).then((record) => {
            res.send(200);
        })
        .catch((err) => {
            res.send(null);
        });

})

//Lyricsの更新

module.exports = router;
