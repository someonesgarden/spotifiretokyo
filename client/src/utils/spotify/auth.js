import userStore from "../../redux/spotify/user";
import tokenStore from "../../redux/spotify/token";
import axios from 'axios';

export default {

    c_implicitGrant:function(type='') {
            let url = "https://accounts.spotify.com/authorize";
            url = url + "?client_id=" + window.clientId;
            url = url + "&scope=" + window.scopes;
            url = url + "&response_type=token";
            url = url + "&redirect_uri=" + window.redirectUri;
            window.location.href = url;
    },
    c_getCredenetialCode:function(type=''){
        let state = '';
        let length = 40;
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            state += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        let base_url ='https://accounts.spotify.com/authorize'
        const params = {
            client_id:window.clientId,
            response_type:"code",
            redirect_uri:window.redirectUri,
            scope:window.scopes,
            state:state
        };


        console.log("params",params);
        //window.location.href = base_url+'?'+Object.keys(params).map(key=> key+'='+params[key]).join('&');

        window.location.href ='/spotify/auth/authorizationCode'
    },

    // c_webHash(){
    //     let hashParams = {};
    //     let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    //     while (e = r.exec(q)) {hashParams[e[1]] = decodeURIComponent(e[2])}
    //     return hashParams;
    // },

    c_webHash(){
        let hashParams = {};
        let e, r = /([^\?&;=]+)=?([^&;]*)/g, q = window.location.search;
        while (e = r.exec(q)) {hashParams[e[1]] = decodeURIComponent(e[2])}
        return hashParams;
    },

    c_checkTokenValidity: (tokenstore) => {
        const {expires_in, access_token} = tokenstore;
        let stored_expires_in   = expires_in ? expires_in : localStorage.getItem('expires_in');
        let stored_token = access_token ? access_token : localStorage.getItem('access_token');
        return !!stored_token && stored_token !== 'null' && stored_token !== 'undefined' && stored_expires_in && stored_expires_in > parseInt(new Date() / 1000);
    },

    c_validateAccessToken(type, callback){
        const {code} = this.c_webHash();
        const {refresh_token} = tokenStore.store;

        let stored_refresh_token = refresh_token ? refresh_token : localStorage.getItem('refresh_token');
        let stored_token  = tokenStore.store.access_token ? tokenStore.store.access_token : localStorage.getItem('access_token');


        if(this.c_checkTokenValidity(tokenStore.store)){
            //アクセストークンが存在して有効期限内の場合、そのまま採用
            localStorage.setItem("access_token", stored_token);
            callback(null, stored_token);

        }else if(!!stored_refresh_token && stored_refresh_token !=='undefined'){
            console.log("case2");
            //refresh_tokenがある場合
            axios.get(`/spotify/auth/refreshAccessToken?refresh_token=${stored_refresh_token}`).then(res => {
                console.log("case2",res.data);
                localStorage.setItem('expires_in', res.data.expires_in);
                localStorage.setItem('access_token', res.data.access_token);
                callback(null, res.data.access_token);
            }).catch(err => {
                console.log("code:post" + err.message);
                //callback(code,null);
            });

        }else if(code){
            //codeがある場合
            axios.get(`/spotify/auth/authorizationCodeGrant?code=${code}`).then(res => {
                let data = res.data.body ? res.data.body : res.data;
                localStorage.setItem('expires_in',   data.expires_in);
                localStorage.setItem('access_token', data.access_token);
                if(data.refresh_token) localStorage.setItem('refresh_token',data.refresh_token);

                callback(null, data.access_token);
            }).catch(err=>{
                //トークン取得に失敗した場合もう一度codeだけでトライする
                console.log("code:post"+err.message);
                //callback(code,null);
            });
        }else{
            //全てに失敗した場合
            callback(null, null);
        }
    }
}
