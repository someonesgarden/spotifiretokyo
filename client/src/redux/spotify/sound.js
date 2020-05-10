/* eslint-disable */

const ActionType = {
    UPDATE_VOLUME: 'UPDATE_VOLUME'
};

let store = {volume: 100};

const reducer = {
    [ActionType.UPDATE_VOLUME]: (payload) => {
        store.volume = payload.value;
        return {
            ...payload.state.soundReducer,
            ...store
        }
    }
};

export default {
    store,
    reducer,
    ActionType
}
