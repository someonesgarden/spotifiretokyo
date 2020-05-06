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

    if(payload.value.authorized){
      store.authorized = payload.value.authorized;
    }

    if(payload.value.me){
      store.me = payload.value.me;
      sessionStorage.setItem('me', store.me);
    }

    if(payload.value.access_token){

      store.access_token = payload.value.access_token;
      sessionStorage.setItem('access_token', store.access_token);
    }
    if(payload.value.refresh_token){
      store.refresh_token = payload.value.refresh_token;
      sessionStorage.setItem('refresh_token', store.refresh_token);
    }
    if(payload.value.expires_in){
      store.expires_in = payload.value.expires_in;
      sessionStorage.setItem('expires_in', store.expires_in);
    }

    return {
      ...payload.state.tokenReducer,
      ...store
    }
  },

  [ActionType.SET_TOKEN]:(payload) => {
    const refresh_token = sessionStorage.getItem('refresh_token');

    store.access_token = payload.value;

    if(refresh_token){
      store.refresh_token = refresh_token;
      store.expires_in = sessionStorage.getItem('expires_in');
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
