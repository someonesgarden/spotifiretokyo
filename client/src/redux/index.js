import spotifyStore from './spotify';
import siteStore from './site';
import lyricsStore from './lyrics';


export const state = {
  ...spotifyStore.store,
  ...siteStore.store,
  ...lyricsStore.store
};

export const state0 = {
  ...spotifyStore.store,
  ...siteStore.store,
  ...lyricsStore.store
};



const commonReducer = (payload) => {
  const reducer = {
    ...spotifyStore.reducer,
    ...siteStore.reducer,
    ...lyricsStore.reducer
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
