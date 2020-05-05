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


router.get('/devices', (req,res)=>{
    const access_token = req.headers.authorization;

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    spotifyApi.getMyDevices().then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get connected devices!', err.message);
            res.send(null);
        }
    );
});

router.get('/currentplayback', (req,res)=>{
    const access_token = req.headers.authorization;

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    spotifyApi.getMyCurrentPlaybackState().then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get current playback state!', err.message);
            res.send(null);
        }
    );
});

router.get('/transferplayback', (req,res)=>{
    const access_token = req.headers.authorization;
    const deviceid   = req.query.deviceid;
    console.log(deviceid);

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);

    spotifyApi.transferMyPlayback({
        deviceIds: [ deviceid ],
        play: false
    }).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not transfer playback!', err.message);
            res.send(null);
        }
    );
});


router.post('/play', (req,res)=>{
    const data          = req.body;
    const access_token  = data.access_token;
    const id            = data.id;
    const type          = data.type ? data.type : 'track';

    let params = {uris:["spotify:"+type+":"+id]};
    //let params = {uris:["spotify:playlist:37i9dQZF1DX6JzJ8vAK836"]};
    if(data.device_id) params.device_id = data.device_id;

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    spotifyApi.play(params).then(
        function(data) {
            res.send(data);
        },
        function(err) {
            console.log('player error', err.message);
            res.send(null);
        }
    );
});

router.get('/pause', (req,res)=>{
    const access_token = req.headers.authorization;

    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    spotifyApi.pause().then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not stop player!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
