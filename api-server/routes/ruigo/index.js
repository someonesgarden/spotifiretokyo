let express = require('express');
let router = express.Router();
let browseRouter = require('./browse');
//類語辞典から似た言葉をスクレイプ
//------ ROUTINGS
router.use('/browse', browseRouter);
module.exports = router;
