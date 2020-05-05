let express = require('express');
let router  = express.Router();
let {Initials}  = require('./model/initials');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/all', (req,res)=>{
    Initials.findAll().then(
        function(data) {
            console.log(data);
            res.send(data);
        },
        function(err) {
            console.log('get all Initials error:', err.message);
            res.send(null);
        }
    );
});

//Initialsの新規作成
router.post('/new', (req,res)=>{
    Initials.create({...req.body}).then((result) => {
            res.send(result);
        },
        (error) => {
            console.log("creat new Initials", error.message);
            res.send(null);
        });
})
// Update
router.post('/update', (req,res)=>{
    Initials.update({
        initial:req.body.initial,
        spotifyids:req.body.spotifyids},
        {
            where:{
                id:req.body.id}
        }).then((result) => {
            res.send(result);
        },
        (error) => {
            console.log("update Initial", error.message);
            res.send(null);
        });
})

//Initialsの検索
router.get('/get', (req,res)=>{
    const key          = req.query.key;
    const val          = req.query.val;

    let queries = {};
    queries[key] = {[Op.like]: '%'+val+'%'};
    console.log(queries);
    Initials.findAll({where: queries}).then((results) => {
            res.send(results);
        },
        (error) => {
            console.log("Initials get error", error.message);
            res.send(null);
        });
})

//Initialsの更新

module.exports = router;
