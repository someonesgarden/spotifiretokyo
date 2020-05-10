/* eslint-disable */

import axios from "axios";
import siteStore from "../redux/site";

export default {
    c_checkURlParams() {
        //URLパラメータを文字列で取得(?含む)
        let urlParamStr = window.location.search;
        let params = {};
        if (urlParamStr) {
            urlParamStr = urlParamStr.substring(1);
            urlParamStr.split('&').forEach(param => {
                const temp = param.split('=');
                params = {...params, [temp[0]]: temp[1]}
            });
        }
        return params;
    },

    c_accessToken(callback){
        const MODE = siteStore.store.site.mode;
        const BASE_URL = siteStore.store.site.base_url;

        const refresh_token = localStorage.getItem('refresh_token');
        const access_token = localStorage.getItem('access_token');
        const expires_time = localStorage.getItem('expires_time');
        const min_remains = (expires_time - new Date().getTime())/60000;

        if(min_remains>0 && access_token){
            callback(access_token);
        }else if(refresh_token){
            axios.get(`${BASE_URL}/spotify/auth/refreshAccessToken?mode=${MODE}&refresh_token=${refresh_token}`).then(res => {
                callback(res.data.access_token);
            }).catch(err => callback(null));
        }else{
            callback(null);
        }
    }
}
