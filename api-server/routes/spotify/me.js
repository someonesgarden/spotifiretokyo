let express = require('express');
let router = express.Router();
const keys = require('../../keys');
//const spotifyApi = keys.spotifyApi;


const SpotifyWebApi = require('spotify-web-api-node');
let params = keys.spotifyParams;
let setSpotifyApi = function(type='emory'){
    return new SpotifyWebApi({
        scope:params[type].scopes.join(' '),
        clientId: params[type].clientId,
        clientSecret:params[type].clientSecret,
        redirectUri: params[type].redirectUri
    });
}


// -------------- ME DATA
router.get('/get_me/:access_token', (req,res)=>{
    let access_token = req.params.access_token;

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    spotifyApi.getMe().then(
        function(data) {
            console.log("get me success!");
            res.send({...data.body});
        },
        function(err) {
            console.log('Could not refresh the token!', err.message);
            res.send(null);
        }
    );
});


router.get('/get_my_toptracks/:access_token', (req,res)=>{

    console.log("get my top tracks calling..");

    let access_token = req.params.access_token;

    console.log(access_token);

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    spotifyApi.getMyTopTracks().then(
        function(data) {
            console.log("get my top tracks success!");
            res.send({...data.body});
        },
        function(err) {
            console.log('Could not refresh the token!', err.message);
            res.send(null);
        }
    );
});



router.get('/get_user_playlists/:access_token/:userid', (req,res)=>{
    let access_token = req.params.access_token;
    let user_id = req.params.userid;
    spotifyApi.setAccessToken(access_token);

    spotifyApi.getUserPlaylists(user_id).then(
        function(data) {
            console.log("get me success!");
            res.send({...data.body});
        },
        function(err) {
            console.log('Could not refresh the token!', err.message);
            res.send(null);
        }
    );
});



module.exports = router;
