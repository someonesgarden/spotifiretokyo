let express = require('express');
let router = express.Router();
let authRouter      = require('./auth');
let meRouter        = require('./me');
let usersRouter     = require('./users');
let browseRouter    = require('./browse');
let playlistsRouter = require('./playlists');
let tracksRouter    = require('./tracks');
let artistsRouter   = require('./artists');
let albumsRouter    = require('./albums');
let podcastRouter   = require('./podcast');
let recoRouter      = require('./recommendations');
let featuresRouter  = require('./audio-features');
let analysisRouter  = require('./audio-analysis');
let searchRouter    = require('./search');


const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;


//------ ROUTINGS
router.use('/auth',             authRouter);
router.use('/me',               meRouter);
router.use('/usersRouter',      usersRouter);
router.use('/tracks',           tracksRouter);
router.use('/artists',          artistsRouter);
router.use('/albums',           albumsRouter);
router.use('/browse',           browseRouter);
router.use('/playlists',        playlistsRouter);
router.use('/podcast',          podcastRouter);
router.use('/recommendations',  recoRouter);
router.use('/audio-features',   featuresRouter);
router.use('/audio-analysis',   analysisRouter);
router.use('/search',           searchRouter);


//------ CALLBACK FROM SPOTIFY API AUTHENTICATION
router.get('/callback', (req, res) => {

    let result = null;
    if(!!req.query.code){
        spotifyApi.authorizationCodeGrant(req.query.code).then((data)=> {

                result = {
                   credentials:{
                       expires_in:data.body['expires_in'],
                       access_token:data.body['access_token'],
                       refresh_token:data.body['refresh_token']
                   },
                    code:req.query.code
                };

                spotifyApi.setAccessToken(data.body['access_token']);

                spotifyApi.getMe().then( res2 =>{
                        result.me = res2.body;
                        res.render('index', { result: result });
                    },
                    err =>{
                        console.log('Could not refresh the token!', err.message);
                        res.render('index', { result: 'Me Error' });
                    }
                );
            },
            err => {
                console.log('Something went wrong!', err);
                console.log(result);
                res.render('index', { title: 'Express' });
            }
        );
    }else{
        result = "no_code";
        res.render('index', { title: 'Express' });
    }
});


module.exports = router;
