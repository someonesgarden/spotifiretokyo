let express = require('express');
let router = express.Router();
let browseRouter = require('./browse');
let trackRouter = require('./track');
let artistRouter = require('./artist');
let albumRouter = require('./album');

//------ ROUTINGS
router.use('/browse', browseRouter);
router.use('/track',  trackRouter);
router.use('/artist', artistRouter);
router.use('/album',  albumRouter);
module.exports = router;
