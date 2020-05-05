let express = require('express');
let router = express.Router();
const keys = require('../../keys');

// https://www.npmjs.com/package/genius-api
let state = "";
let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 40; i++) state += possible.charAt(Math.floor(Math.random() * possible.length));

state = "1";

router.get('/callback', (req, res) => {

    let code = req.query.code;
    if(code){
        let tokenConfig = {
            code: code,
            client_secret:keys.geniusClientSecret,
            grant_type:"authorization_code",
            client_id:keys.geniusClientId,
            redirect_uri: keys.geniusRedirectUri,
            response_type:"code",
            state: state
        };

        const credentials = {
            client: {
                id: keys.geniusClientId,
                secret: keys.geniusClientSecret
            },
            auth: {
                tokenHost: 'https://api.genius.com/oauth/token'
            }
        };
        const oauth2 = require('simple-oauth2').create(credentials);


        // Save the access token
        oauth2.authorizationCode.getToken(tokenConfig)
            .then((result) => {
                const token = oauth2.accessToken.create(result);
                console.log(token);
            })
            .catch((error) => {
                console.log('Access Token Error', error.message);
            });
    }
    res.send(code);
});


router.get('/get_credential', (req,res)=>{

    const credentials = {
        client: {
            id: keys.geniusClientId,
            secret: keys.geniusClientSecret
        },
        auth: {
           // tokenHost: 'https://api.genius.com/oauth/authorize'
            tokenHost: 'https://api.genius.com/oauth/token'
        }
    };
    const oauth2 = require('simple-oauth2').create(credentials);


    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        client_id:keys.geniusClientId,
        redirect_uri: keys.geniusRedirectUri,
        state: state,
        response_type:'code'
    });
    res.redirect(authorizationUri);

});




module.exports = router;
