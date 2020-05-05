let express = require('express');
let router = express.Router();
const fs = require("fs");

const keys = require('../../keys');

//*-------------------------------  TWITTER
const twitter = require("twitter");

let twitter_secrets = {
    "consumer_key"        : keys.twitterConsumerKey,
    "consumer_secret"     : keys.twitterConsumerSecret,
    "access_token_key"    : keys.twitterAccessTokenKey,
    "access_token_secret" : keys.twitterAccessTokenSecret
}
const client = new twitter(twitter_secrets);
//*-------------------------------  TWITTER

router.get('/get', (req, res) => {
    const params = {screen_name: 'someonesgarden',count:20};
    console.log(twitter_secrets)
    console.log("@" + params.screen_name);
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            fs.appendFileSync("timeline.json",JSON.stringify(tweets) + "\n","utf-8");
            res.send(tweets);
        }
        console.log(error)
    });
});

router.get('/search', (req, res) => {
    let q = req.query.q ? req.query.q : 'ラーメン';
    const params = {q: q, count:10};
    client.get('search/tweets', params, function(error, tweets, response) {
        res.send(tweets);
    });
});

module.exports = router;
