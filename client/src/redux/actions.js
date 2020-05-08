import spotifyStore from './spotify';
import siteStore from './site';
import lyricsStore from './lyrics';

export const ActionType = {
    ...spotifyStore.ActionType,
    ...siteStore.ActionType,
    ...lyricsStore.ActionType
}
