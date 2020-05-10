/* eslint-disable */

import mb from './musicbrainz';
import mm from './musixmatch';
import kg from './kget';

const store = {
    mbReducer:mb.store,
    mmReducer:mm.store,
    kgReducer:kg.store

};

export const ActionType = {
    ...mb.ActionType,
    ...mm.ActionType,
    ...kg.ActionType,
};

const reducer = {
    ...mb.reducer,
    ...mm.reducer,
    ...kg.reducer
};


export default {
    store,
    reducer,
    ActionType
}
