import userStore from "../../redux/spotify/user";
import tokenStore from "../../redux/spotify/token";
import axios from 'axios';

export default {

    c_webHash(){
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    },

    c_checkTokenValidity: (tokenstore) => {
        const {expires_in, token} = tokenstore;
        let stored_expires_in   = expires_in ? expires_in : sessionStorage.getItem('expires_in');
        let stored_token = token ? token : sessionStorage.getItem('token');
        return !!stored_token && stored_token !== 'null' && stored_token !== 'undefined' && stored_expires_in && stored_expires_in > parseInt(new Date() / 1000);
    },

    // c_validateAccessToken(type, callback){
    //     const {code} = this.c_webHash();
    //     const {refresh_token} = tokenStore.store;
    //
    //     let stored_refresh_token = refresh_token ? refresh_token : sessionStorage.getItem('refresh_token');
    //     let stored_token  = tokenStore.store.token ? tokenStore.store.token : sessionStorage.getItem('token');
    //
    //     if(this.c_checkTokenValidity(tokenStore.store)){
    //         //アクセストークンが存在して有効期限内の場合、そのまま採用
    //         sessionStorage.setItem("token", stored_token);
    //         callback(null, stored_token);
    //
    //     }else if(!!stored_refresh_token && stored_refresh_token !=='undefined'){
    //         //期限切れだけどrefresh_tokenはある場合
    //         const params = {refresh_token:stored_refresh_token,type:"/"+type};
    //         axios.post('/api/spotify/auth/requestAccessToken', {params:JSON.stringify(params)},{headers: {'Content-Type': 'application/json'}}).then(res => {
    //             sessionStorage.setItem('expires_in',   res.data.expires_in);
    //             sessionStorage.setItem('refresh_token',res.data.refresh_token);
    //             sessionStorage.setItem('access_token', res.data.token);
    //             callback(null, res.data.access_token);
    //         }).catch(err=>console.log(err));
    //
    //     }else if(code){
    //         //codeがある場合トークンを取得する
    //         const params = {code:code,type:"/"+type};
    //         console.log("CODE!!!",params);
    //         axios.post('/api/spotify/auth/requestAccessToken', {params:JSON.stringify(params)},{headers: {'Content-Type': 'application/json'}}).then(res => {
    //             sessionStorage.setItem('expires_in',   res.data.expires_in);
    //             sessionStorage.setItem('refresh_token',res.data.refresh_token);
    //             sessionStorage.setItem('token', res.data.access_token);
    //             callback(null, res.data.access_token);
    //         }).catch(err=>{
    //             //トークン取得に失敗した場合もう一度codeだけでトライする
    //             console.log("code:post"+err.message);
    //             //callback(code,null);
    //         });
    //     }else{
    //         //全てに失敗した場合
    //         callback(null, null);
    //     }
    // }
}

