let express     = require('express');
let router      = express.Router();
const WebApiRequest = require('../../node_modules/spotify-web-api-node/src/webapi-request');
const HttpManager   = require('../../node_modules/spotify-web-api-node/src/http-manager');

router.get('/byid', (req,res)=>{
    const access_token = req.headers.authorization;
    const playlistid   = req.query.playlistid;

    return WebApiRequest.builder(access_token)
        .withPath('/v1/playlists/' + playlistid)
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters()
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get playlist info!', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});

router.get('/tracks', (req,res)=>{
    const access_token = req.headers.authorization;
    const playlistid   = req.query.playlistid;

    return WebApiRequest.builder(access_token)
        .withPath('/v1/playlists/' + playlistid + '/tracks')
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters()
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});

module.exports = router;
