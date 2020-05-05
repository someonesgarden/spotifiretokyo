let express = require('express');
let router = express.Router();
const keys = require('../../keys');
// const spotifyApi = keys.spotifyApi;

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
    const albumid   = req.query.albumid;

    const spotifyApi = setSpotifyApi();

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getAlbum(albumid).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get album info!', err.message);
            res.send(null);
        }
    );
});


router.post('/ids', (req,res)=>{
    const data = req.body;
    const access_token = data.access_token;
    const ids   = data.ids;

    const spotifyApi = setSpotifyApi();

    spotifyApi.setAccessToken(access_token);

    spotifyApi.getAlbums(ids).then(
        function(data) {
            res.send(data.body);
        },
        function(err) {
            console.log('Could not get Albums!', err.message);
            res.send(null);
        }
    );
});

module.exports = router;
