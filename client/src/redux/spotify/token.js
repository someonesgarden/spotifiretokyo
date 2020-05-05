const ActionType = {
  SET_TOKEN:'SET_TOKEN'
};

const store = {};


const reducer = {
  [ActionType.SET_TOKEN]:(payload) => {
    store.token = payload.value;
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
