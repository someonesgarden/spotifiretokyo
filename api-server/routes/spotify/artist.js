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


router.get('/byid', (req,res)=>{
    const access_token = req.headers.authorization;
    const artistid   = req.query.artistid;


    const spotifyApi = setSpotifyApi();

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getArtist(artistid).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get artist info!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
