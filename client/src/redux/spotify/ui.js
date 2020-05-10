/* eslint-disable */

const ActionType = {
  UPDATE_HEADER_TITLE:'UPDATE_HEADER_TITLE'
};

const store = {
  title: 'Songs'
};


const reducer = {
  [ActionType.UPDATE_HEADER_TITLE]:(payload) => {
    store.title = payload.value;
    return {
      ...payload.state.uiReducer,
      ...store
    }
  }
};



export default {
  store,
  reducer,
  ActionType
}
