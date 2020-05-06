export default {
    c_initSpotifySDKPlayer:()=>{
        console.log("c_initSpotifySDKPlayer!");
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        head.appendChild(script);
        console.log('script loaded');
        window.onSpotifyWebPlaybackSDKReady = () => {
            window.player = new Spotify.Player({name: 'SpotBrain Player', getOAuthToken: cb => { cb(access_token);}});
            window.player.addListener('initialization_error', ({ message }) => { console.error(message); });
            window.player.addListener('authentication_error', ({ message }) => { console.error(message); });
            window.player.addListener('account_error', ({ message }) => { console.error(message); });
            window.player.addListener('playback_error', ({ message }) => { console.error(message); });
            window.player.addListener('player_state_changed', state => {window.playerCallback(state);});
            window.player.addListener('ready', ({ device_id }) => {window.device_id = device_id;});
            window.player.addListener('not_ready', ({ device_id }) => {window.device_id = device_id;});
            window.player.connect();
        };
    }
}
