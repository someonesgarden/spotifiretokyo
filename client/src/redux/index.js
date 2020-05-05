import spotifyStore from './spotify';


export const state = {
  ...spotifyStore.store
};

export const state0 = {
  ...spotifyStore.store
};




const commonReducer = (payload) => {
  const reducer = {
    ...spotifyStore.reducer
  };

  //ASYNC
  if (!!reducer[payload.actionType]) {
    return {
      ...state,
      ...reducer[payload.actionType](payload)
    }
  } else {
    return state;
  }
};

export const totalReducer = (state = state0, action) => {
  return commonReducer({
    state: state,
    value: action.value,
    actionType: action.type
  });
};
