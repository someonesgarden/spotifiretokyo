let express = require('express');
let router = express.Router();
let {Users} = require('./model/users');

router.get('/all', (req,res)=>{
    Users.findAll().then(
        function(data) {
            res.send(data);
        },
        function(err) {
            console.log('get all users error:', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
