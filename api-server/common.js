const WebApiRequest = require('./node_modules/spotify-web-api-node/src/webapi-request');
const HttpManager   = require('./node_modules/spotify-web-api-node/src/http-manager');

const keys = require('./keys');
let params = keys.spotifyParams;
const SpotifyWebApi = require('spotify-web-api-node');
let setSpotifyApi = function(type='emory'){
    return new SpotifyWebApi({
        scope:params[type].scopes.join(' '),
        clientId: params[type].clientId,
        clientSecret:params[type].clientSecret,
        redirectUri: params[type].redirectUri
    });
};


const getToken=(req)=>{
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const execApiReq=(endpoint,options,req,callback)=>{
    const api = setSpotifyApi();
    const access_token = getToken(req);
    api.setAccessToken(access_token);

    let builder = WebApiRequest.builder(access_token)
        .withPath(endpoint)
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'});

    if(options) builder.withQueryParameters(options);

    return builder.build().execute(HttpManager['get'], (err,data)=>{
            if(err){
                console.log("error@:"+endpoint, err.message);
                callback(null);
                return;
            }
            callback(data.body);
        });
};

const execApi=(endpoint,rest,options,req,callback)=>{
    const api = setSpotifyApi();
    const access_token = getToken(req);
    api.setAccessToken(access_token);

    let builder = WebApiRequest.builder(access_token)
        .withPath(endpoint)
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'});

    if(options) builder.withQueryParameters(options);

    return builder.build().execute(HttpManager[rest], (err,data)=>{
        if(err){
            console.log("error@:"+endpoint, err.message);
            callback(null);
            return;
        }
        callback(data.body);
    });
};

const execImageApi=(endpoint,rest,options,req,callback)=>{
    const api = setSpotifyApi();
    const access_token = getToken(req);
    api.setAccessToken(access_token);

    let builder = WebApiRequest.builder(access_token)
        .withPath(endpoint)
        .withHeaders({ 'Content-Type': 'image/jpeg' })
        .withBodyParameters(options);

    return builder.build().execute(HttpManager[rest], (err,data)=>{
        if(err){
            console.log("error@:"+endpoint, err.message);
            callback(null);
            return;
        }
        callback(data.body);
    });
};

const execPlayerApi=(endpoint,rest,queryParams, bodyOptions,req,callback)=>{
    const api = setSpotifyApi();
    const access_token = getToken(req);
    api.setAccessToken(access_token);

    let builder = WebApiRequest.builder(access_token)
        .withPath(endpoint)
        .withQueryParameters(queryParams)
        .withHeaders({ 'Content-Type': 'application/json' })
        .withBodyParameters(bodyOptions);

    return builder.build().execute(HttpManager[rest], (err,data)=>{
        if(err){
            console.log("error@:"+endpoint, err.message);
            callback(null);
            return;
        }
        callback(data.body);
    });
};



module.exports = {
    execApiReq:execApiReq,
    execApi:execApi,
    execImageApi:execImageApi,
    execPlayerApi:execPlayerApi
}
