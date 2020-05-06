const ActionType = {
  SET_TOKEN:'SET_TOKEN',
  SET_CODE_AND_STATE: 'SET_CODE_AND_STATE',
  SET_AUTHORIZATION:'SET_AUTHORIZATION'
};

const store = {};


const reducer = {

  [ActionType.SET_CODE_AND_STATE]: (payload) => {
    store.code = payload.value.code;
    store.state = payload.value.state;
    return {
      ...payload.state.tokenReducer,
      ...store
    }
  },

  [ActionType.SET_AUTHORIZATION]: (payload) => {

    if(!!payload.value){
      if(payload.value.authorized){
        store.authorized = payload.value.authorized;
      }

      if(payload.value.me){
        store.me = payload.value.me;
        localStorage.setItem('me', store.me);
      }

      if(payload.value.access_token){
        store.access_token = payload.value.access_token;
        localStorage.setItem('access_token', store.access_token);
      }
      if(payload.value.refresh_token){
        store.refresh_token = payload.value.refresh_token;
        localStorage.setItem('refresh_token', store.refresh_token);
      }
      if(payload.value.expires_in){
        store.expires_in = payload.value.expires_in;
        localStorage.setItem('expires_in', store.expires_in);
      }
    }



    return {
      ...payload.state.tokenReducer,
      ...store
    }
  },

  [ActionType.SET_TOKEN]:(payload) => {
    const refresh_token = localStorage.getItem('refresh_token');

    store.access_token = payload.value;

    if(refresh_token){
      store.refresh_token = refresh_token;
      store.expires_in = localStorage.getItem('expires_in');
    }

    return {
      ...payload.state.tokenReducer,
      ...store
    }
  }
};


export default {
  store,
  reducer,
  ActionType
}
