let express = require('express');
let router = express.Router();
let authRouter = require('./auth');
let meRouter = require('./me');
let browseRouter = require('./browse');
let playlistRouter = require('./playlist');
let trackRouter = require('./track');
let artistRouter = require('./artist');
let albumRouter = require('./album');
let playerRouter = require('./player');
let podcastRouter = require('./podcast');

const keys = require('../../keys');
const spotifyApi = keys.spotifyApi;


//------ ROUTINGS
router.use('/auth', authRouter);
router.use('/me', meRouter);
router.use('/browse',browseRouter);
router.use('/playlist',playlistRouter);
router.use('/track',trackRouter);
router.use('/artist',artistRouter);
router.use('/album', albumRouter);
router.use('/player',playerRouter);
router.use('/podcast',podcastRouter);


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
