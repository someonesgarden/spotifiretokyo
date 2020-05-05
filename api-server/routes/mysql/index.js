let express = require('express');
let router = express.Router();

let usersRouter = require('./users');
let lyricsRouter= require('./lyrics');
let initialsRouter= require('./initials');

//------ ROUTINGS
router.use('/users',    usersRouter);
router.use('/lyrics',   lyricsRouter);
router.use('/initials', initialsRouter);

module.exports = router;
