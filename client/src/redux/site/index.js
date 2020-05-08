export const ActionType = {
    APP_TRY_AUTH:'APP_TRY_AUTH'
};

//   base_url :'https://www.spotifire.tokyo',  # GCD  (api-serverは8080に。）
//   base_url :'http://localhost:3030',        # Local test(api-serverも3030に。）

const store = {
    site:{
        mode:"DEV",
        base_url :'http://localhost:3030',
        //base_url :'http://localhost:8080',
        // base_url :'https://www.spotifire.tokyo',
        auth:{
          main:{id:'brain',pw:'brainbrain',matched:false}
        },

        anime:{
            className:'fade',
            timeout:{ enter: 400, exit: 100 },
        },
    }
};

const reducer = {
    //APP_TRY_AUTH
    [ActionType.APP_TRY_AUTH]:(payload)=>{
        const type = payload.value.type;
        const pw = payload.value.pw;
        const id = payload.value.id;

        sessionStorage.setItem('auth_try'+type,JSON.stringify({id:id,pw:pw}));

        store.site.auth[type].matched = store.site.auth[type].id===id && store.site.auth[type].pw===pw;

        store.site = {
            ...store.site
        };

        return {
            ...payload.state,
            ...store
        }
    }
};


export default {
    store:store,
    reducer:reducer,
    ActionType:ActionType
}
