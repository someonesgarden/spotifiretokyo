let express = require('express');
let router = express.Router();
let parserRouter = require('./parser');

//------ ROUTINGS
router.use('/parser',parserRouter);
module.exports = router;
