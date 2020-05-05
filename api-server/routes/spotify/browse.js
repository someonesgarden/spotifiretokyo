let express = require('express');
let router = express.Router();
const keys = require('../../keys');
//const spotifyApi = keys.spotifyApi;
const WebApiRequest = require('../../node_modules/spotify-web-api-node/src/webapi-request');
const HttpManager   = require('../../node_modules/spotify-web-api-node/src/http-manager');


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


const powerade_params = {
    workout:{
        gym:{
            hard:{
                bpm:{
                    min_tempo:180,
                },
                genres:['electronic', 'dance', 'hip-hop', 'rock', 'alternative']
            },
            normal:{
                bpm:{
                    max_tempo:179,
                    min_tempo:160,
                },
                genres:['electronic', 'dance', 'hip-hop', 'rock', 'alternative']
            },
            easy:{
                bpm:{
                    max_tempo:159,
                    min_tempo:140,
                },
                genres:['electronic', 'dance', 'hip-hop', 'rock', 'alternative']
            }
        },
        running:{
            hard:{
                bpm:{
                    min_tempo:180,
                },
                genres:['pop', 'rock', 'indie', 'alternative']
            },
            normal:{
                bpm:{
                    max_tempo:179,
                    min_tempo:160,
                },
                genres:['pop', 'rock', 'indie', 'alternative']
            },
            easy:{
                bpm:{
                    max_tempo:159,
                    min_tempo:140,
                },
                genres:['pop', 'rock', 'indie', 'alternative']
            }
        },
        stretch:{
            hard:{
                bpm:{
                    min_tempo:180,
                },
                genres:['new-age', 'ambient']
            },
            normal:{
                bpm:{
                    max_tempo:179,
                    min_tempo:160,
                },
                genres:['new-age', 'ambient']
            },
            easy:{
                bpm:{
                    max_tempo:159,
                    min_tempo:140,
                },
                genres:['new-age', 'ambient']
            }
        }
    },

    cooldown:{
        gym:{
            hard:{
                bpm:{
                    min_tempo:140,
                },
                genres:['electronic', 'dance', 'hip-hop', 'rock', 'indie']
            },
            normal:{
                bpm:{
                    max_tempo:139,
                    min_tempo:100,
                },
                genres:['electronic', 'dance', 'hip-hop', 'rock', 'indie']
            },
            easy:{
                bpm:{
                    max_tempo:99,
                    min_tempo:60,
                },
                genres:['electronic', 'dance', 'hip-hop', 'rock', 'indie']
            }
        },
        running:{
            hard:{
                bpm:{
                    min_tempo:140,
                },
                genres:['indie', 'alternative', 'r-n-b', 'blues', 'soul']
            },
            normal:{
                bpm:{
                    max_tempo:139,
                    min_tempo:100,
                },
                genres:['indie', 'alternative', 'r-n-b', 'blues', 'soul']
            },
            easy:{
                bpm:{
                    max_tempo:99,
                    min_tempo:60,
                },
                genres:['indie', 'alternative', 'r-n-b', 'blues, soul']
            }
        },
        stretch:{
            hard:{
                bpm:{
                    min_tempo:100,
                },
                genres:['new-age', 'ambient', 'folk', 'acoustic']
            },
            normal:{
                bpm:{
                    max_tempo:99,
                    min_tempo:80,
                },
                genres:['new-age', 'ambient', 'folk', 'acoustic']
            },
            easy:{
                bpm:{
                    max_tempo:79,
                    min_tempo:50,
                },
                genres:['new-age', 'ambient', 'folk', 'acoustic']
            }
        }
    }
}

router.get('/featured', (req,res)=>{
    console.log("here is /featured");
    const access_token = req.headers.authorization;
    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);

    const country   = req.query.country ? req.query.country : 'JP';
    const options   = {limit:45, country: country, locale: 'ja-JP', 'accept-language':'ja-JP'};

    console.log(options);

    return WebApiRequest.builder(access_token)
        .withPath('/v1/browse/featured-playlists')
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters(options)
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get featured playlists!', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});


router.get('/idcheck', (req,res)=>{

    console.log("here is /idcheck");
    const access_token = req.headers.authorization;
    const anyid   = req.query.anyid;
    const spotifyApi = setSpotifyApi();
    spotifyApi.setAccessToken(access_token);
    let p1 = spotifyApi.getAlbum(anyid);
    let p2 = spotifyApi.getPlaylist(anyid);

    spotifyApi.getPlaylist(anyid).then((ok1)=>{ res.send(ok1)},
        (no1)=>{
            spotifyApi.getTrack(anyid).then((ok2)=>{res.send(ok2)},
                (no2)=>{
                    spotifyApi.getAlbum(anyid).then((ok3)=>{res.send(ok3)},
                        (no3)=>{
                            spotifyApi.getArtist(anyid).then((ok4)=>{res.send(ok4)},
                                (no4)=>{
                                    res.send('');
                                }).catch(error => {
                                console.log(error);
                            });
                        })
                })
        })
});

router.post('/search', (req,res)=>{
    const data         = req.body;
    const access_token = data.access_token;
    const conditions   = data.conditions;
    const options      = { limit : conditions.limit, offset : conditions.offset};

    return WebApiRequest.builder(access_token)
        .withPath('/v1/search/')
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters(
            {
                type: conditions.datatypes.join(','),
                q: conditions.term
            },
            options
        )
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not refresh the token!', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});

let shuffle = function(array){
    for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}


let powerade_gen = function(res,req,params,metracks=null){
    let gen = params.gen;
    let options = gen.bpm;
    let genres = shuffle(gen.genres);
    options.min_popularity = params.popularity;

    if(metracks){
        options.seed_genres = genres.slice(0,2);
        let tracks = shuffle(metracks);
        options.seed_tracks = tracks.slice(0,3);
    }else{
        options.seed_genres = genres;
        delete options.seed_tracks;
    }

    let _opts = {};
    let optionsOfTypeArray = ['seed_artists', 'seed_genres', 'seed_tracks'];
    for (let option in options) {
        if (options.hasOwnProperty(option)) {
            if (
                optionsOfTypeArray.indexOf(option) !== -1 &&
                Object.prototype.toString.call(options[option]) === '[object Array]'
            ) {
                _opts[option] = options[option].join(',');
            } else {
                _opts[option] = options[option];
            }
        }
    }

    return WebApiRequest.builder(params.access_token)
        .withPath('/v1/recommendations')
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters(_opts)
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get recos', err.message);
                res.send({
                    error:err.message
                });
                return;
            }
            res.send(data.body);
        });
};

router.get('/powerade', (req,res)=>{
    const data = req.query;
    const access_token = data.access_token;
    const mov   = data.mov;    // workout, cooldown
    const type  = data.type;   // gym, running, stretch
    const level = data.level;  // hard, normal, easy
    const popularity = data.popularity ? data.popularity : 10;
    const spotifyApi = setSpotifyApi();

    if(!access_token){
        spotifyApi.clientCredentialsGrant().then(
            function(data) {
                powerade_gen(res,req,{
                    gen:powerade_params[mov][type][level],
                    access_token:data.body['access_token'],
                    popularity:popularity
                })
            },
            function(err) {
                res.send({
                    error:err.message
                });
            }
        );
    }else{
        return WebApiRequest.builder(access_token)
            .withPath('/v1/me/top/tracks')
            .withQueryParameters({})
            .build()
            .execute(HttpManager.get, (err,data)=>{
                if(err){
                    res.send({
                        error:err.message
                    });
                    return;
                }
                powerade_gen(res,req,{
                    gen:powerade_params[mov][type][level],
                    access_token:access_token,
                    popularity:popularity
                },[
                    data.body.items[0].id,
                    data.body.items[1].id,
                    data.body.items[2].id
                ])
            });
    }
});

router.post('/recommendations', (req,res)=>{
    const data = req.body;
    const access_token = data.access_token;
    const options   = data.queries ? data.queries : { min_energy: 0.4, seed_artists: ['4og9jrin5xH5JiFPbeGUPb', '6l3HvQ5sa6mXTsMTB19rO5'], min_popularity: 10 };

    /* */
    let _opts = {};
    let optionsOfTypeArray = ['seed_artists', 'seed_genres', 'seed_tracks'];
    for (let option in options) {
        if (options.hasOwnProperty(option)) {
            if (
                optionsOfTypeArray.indexOf(option) !== -1 &&
                Object.prototype.toString.call(options[option]) === '[object Array]'
            ) {
                _opts[option] = options[option].join(',');
            } else {
                _opts[option] = options[option];
            }
        }
    }

    return WebApiRequest.builder(access_token)
        .withPath('/v1/recommendations')
        .withHeaders({ 'Content-Type' : 'application/json', 'Accept-Language':'ja;q=1'})
        .withQueryParameters(_opts)
        .build()
        .execute(HttpManager.get, (err,data)=>{
            if(err){
                console.log('Could not get recos', err.message);
                res.send(null);
                return;
            }
            res.send(data.body);
        });
});


module.exports = router;
