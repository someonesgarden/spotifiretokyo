import mb from './musicbrainz';
import mm from './musixmatch';

const store = {
    mbReducer:mb.store,
    mmReducer:mm.store

};

export const ActionType = {
    ...mb.ActionType,
    ...mm.ActionType
};

const reducer = {
    ...mb.reducer,
    ...mm.reducer
};


export default {
    store,
    reducer,
    ActionType
}
