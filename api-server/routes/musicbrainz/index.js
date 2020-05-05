let express = require('express');
let router = express.Router();
let browseRouter = require('./browse');

//------ ROUTINGS
router.use('/browse', browseRouter);
module.exports = router;
