let express = require('express');
let router = express.Router();
const keys = require('../../keys');
const SpotifyWebApi = require('spotify-web-api-node');
let params = keys.spotifyParams;


let setSpotifyApi = function(type){
    return new SpotifyWebApi({
        scope:params[type].scopes.join(' '),
        clientId: params[type].clientId,
        clientSecret:params[type].clientSecret,
        redirectUri: params[type].redirectUri
    });
}

let getAuthorizeURL = function(type='emory') {
    const spotifyApi = setSpotifyApi(type);
    let state = '';
    let length = 40;
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        state += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return spotifyApi.createAuthorizeURL(params[type].scopes, state);
}

router.get('/clientCredentialsGrant', (req,res)=>{
    const spotifyApi = setSpotifyApi('emory');
      spotifyApi.clientCredentialsGrant().then(
        function(data) {
          let result = {
              expires_in:data.body['expires_in'],
              access_token:data.body['access_token'],
              refresh_token:data.body['refresh_token']
          };
          res.send(result);
        },
        function(err) {
          res.send("error;"+err.message);
        }
    );
});

router.get('/getAuthorizeURL', (req,res)=>{
    let type = req.query.type || 'emory';
    let authorizeURL = getAuthorizeURL(type);
    res.send(authorizeURL);
});

router.get('/authorizationCode', (req,res)=>{
    let type = req.query.type || 'emory';
    let authorizeURL = getAuthorizeURL(type);
    res.writeHead(302, {
        'Location':authorizeURL
    });
    res.end();
});

router.get('/authorizationCodeGrant',(req,res)=>{
    let type = req.query.type || 'emory';
    const spotifyApi = setSpotifyApi(type);

    const code = req.query.code;
    spotifyApi.authorizationCodeGrant(code).then(data => {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.getMe().then(res2 => {
                    data.me = res2.body;
                    res.send(data);
                },
                err => {
                    console.log('Could not get me!', err);
                    res.send("error;" + err.message);
                }
            );
        },
        err => {
            console.log('Something went wrong!', err);
            res.send("error;" + err.message);
        }
    );
});


// Refresh Access Token
router.get('/refreshAccessToken', (req,res)=>{

    let type = req.query.type || 'emory';
    const spotifyApi = setSpotifyApi(type);
    const refresh_token = req.query.refresh_token;
    spotifyApi.setRefreshToken(refresh_token);
    spotifyApi.refreshAccessToken().then(

        function(data) {
            res.send({...data.body, refresh_token: req.body['refresh_token']});
        },

        function(err) {
            console.log('Could not refresh the token!', err.message);
            res.redirect('/sendAuthorizeURL');
            res.send(null);
        }
    );
});


// Refresh Access Token
// router.post('/refreshAccessToken', (req,res)=>{
//
//     let type = req.query.type || 'emory';
//     const spotifyApi = setSpotifyApi(type);
//
//     spotifyApi.setAccessToken(req.body['access_token']);
//     spotifyApi.setRefreshToken(req.body['refresh_token']);
//     spotifyApi.refreshAccessToken().then(
//         function(data) {
//             res.send({...data.body, refresh_token: req.body['refresh_token']});
//         },
//         function(err) {
//             console.log('Could not refresh the token!', err.message);
//             res.redirect('/sendAuthorizeURL');
//             res.send(null);
//         }
//     );
// });



module.exports = router;
