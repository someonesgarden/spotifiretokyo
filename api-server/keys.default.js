const spotifyParams = {
    emory:{
        scopes : [
            'streaming',
            "user-read-birthdate",
            "user-read-email",
            'user-read-private',
            'user-read-birthdate',
            'user-read-private',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-modify-playback-state',
            'user-top-read',
            'user-read-recently-played',
        ],
        clientId: '',
        clientSecret: '',
        redirectUri: ''
    }
}


module.exports = {
    MAPBOX_TOKEN: '',
    musixmatchKey:'',
    geniusClientId: '',
    geniusClientSecret: '',

    geniusRedirectUri: '',
    geniusAccessToken: '',
    geniusScope:["me"], //['me', 'create_annotation', 'manage_annotation', 'vote'],

    spotifyParams: spotifyParams,
    spotifyApi:null,

    twitterConsumerKey:'',
    twitterConsumerSecret:'',
    twitterAccessTokenKey:'',
    twitterAccessTokenSecret:'',

    mysqlHost:'',
    mysqlPort:'',
    mysqlDatabase:'',
    mysqlUser:'',
    mysqlPassword:''
};
