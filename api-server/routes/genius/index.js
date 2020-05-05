let express = require('express');
let router = express.Router();
let authRouter = require('./auth');
let browseRouter = require('./browse');

//------ ROUTINGS
router.use('/auth', authRouter);
router.use('/browse', browseRouter);

module.exports = router;
