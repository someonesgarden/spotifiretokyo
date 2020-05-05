import album from './album';
import artist from './artist';
import browse from './browse';
import playlist from './playlist';
import song from './song';
import sound from './sound';
import token from './token';
import ui from './ui';
import user from './user';


const store = {
    albumReducer:album.store,
    artistsReducer:artist.store,
    browseReducer:browse.store,
    playlistReducer:playlist.store,
    songsReducer:song.store,
    soundReducer:sound.store,
    tokenReducer:token.store,
    uiReducer:ui.store,
    userReducer:user.store
};

export const ActionType = {
    ...album.ActionType,
    ...artist.ActionType,
    ...browse.ActionType,
    ...playlist.ActionType,
    ...song.ActionType,
    ...sound.ActionType,
    ...token.ActionType,
    ...ui.ActionType,
    ...user.ActionType
};

const reducer = {
    ...album.reducer,
    ...artist.reducer,
    ...browse.reducer,
    ...playlist.reducer,
    ...song.reducer,
    ...sound.reducer,
    ...token.reducer,
    ...ui.reducer,
    ...user.reducer
};


export default {
    store,
    reducer,
    ActionType
}
