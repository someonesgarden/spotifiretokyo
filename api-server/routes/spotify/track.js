let express = require('express');
let router = express.Router();
// const keys = require('../../keys');
// const spotifyApi = keys.spotifyApi;
const WebApiRequest = require('../../node_modules/spotify-web-api-node/src/webapi-request');
const HttpManager   = require('../../node_modules/spotify-web-api-node/src/http-manager');


router.get('/byid', (req,res)=>{
    const access_token = req.headers.authorization;
    const trackId = req.query.trackid;

    // spotifyApi.setAccessToken(access_token);
    // spotifyApi.getTrack(trackId).then(
    //     function(data) {
    //         res.send(data.body);
    //     },
    //     function(err) {
    //         console.log('Could not get track info!', err.message);
    //         res.send(null);
    //     }
    // );

    return WebApiRequest.builder(access_token)
        .withPath('/v1/tracks/' + trackId)
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters({})
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get track info!', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});


router.get('/features', (req,res)=>{
    const access_token = req.headers.authorization;
    const trackId = req.query.trackid;

    // spotifyApi.setAccessToken(access_token);
    // spotifyApi.getAudioFeaturesForTrack(trackId).then(
    //     function(data) {
    //         res.send(data.body);
    //     },
    //     function(err) {
    //         console.log('Could not get track audio features!', err.message);
    //         res.send(null);
    //     }
    // );

    return WebApiRequest.builder(access_token)
        .withPath('/v1/audio-features/' + trackId)
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters({})
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get track audio features!', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });

});


router.get('/analysis', (req,res)=>{
    const access_token = req.headers.authorization;
    const trackId = req.query.trackid;

    // spotifyApi.setAccessToken(access_token);
    // spotifyApi.getAudioAnalysisForTrack(trackId).then(
    //     function(data) {
    //         res.send(data.body);
    //     },
    //     function(err) {
    //         console.log('Could not get track audio analysis!', err.message);
    //         res.send(null);
    //     }
    // );

    return WebApiRequest.builder(access_token)
        .withPath('/v1/audio-analysis/' + trackId)
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters({})
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get track audio analysis!', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});

module.exports = router;
