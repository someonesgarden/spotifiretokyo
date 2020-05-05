let express = require('express');
let router = express.Router();
let browseRouter = require('./browse');
//歌詞ゲットを利用した日本語歌詞の取得
//------ ROUTINGS
router.use('/browse', browseRouter);
module.exports = router;
