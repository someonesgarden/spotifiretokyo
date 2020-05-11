/* eslint-disable */

export const ActionType = {
    APP_TRY_AUTH: 'APP_TRY_AUTH',
    APP_AUTHORIZED: 'APP_AUTHORIZED'
};

const store = {
    site: {
        //ローカル実験の時はこっち。(client内でnpm run start)
        mode: "DEV",
        base_url: 'http://localhost:3030',

        //GCDで本番の時はこっち。
        // mode:"PROD",
        // base_url :'https://www.spotifire.tokyo',
        auth: {
            main: {id: 'brain', pw: 'brainbrain', matched: false},

        },

        auth_updated: null,

        anime: {
            className: 'fade',
            timeout: {enter: 400, exit: 100},
        },
    }
};

const reducer = {
    [ActionType.APP_TRY_AUTH]: (payload) => {
        const type = payload.value.type;
        const pw = payload.value.pw;
        const id = payload.value.id;

        sessionStorage.setItem('auth_try' + type, JSON.stringify({id: id, pw: pw}));
        store.site.auth[type].matched = store.site.auth[type].id === id && store.site.auth[type].pw === pw;
        store.site.auth_updated = new Date();

        store.site = {
            ...store.site
        };

        return {
            ...payload.state,
            ...store
        }
    }
};

export const BASE_URL = store.site.base_url;

export default {
    store: store,
    reducer: reducer,
    ActionType: ActionType
}
