/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import SongList from '../SongList';
import AlbumList from '../AlbumList';
import ArtistList from '../ArtistList';
import BrowseView from '../BrowseView';
import PreSaveView from '../PreSaveView';

const MainView = ({headerTitle, audioControl, resumeSong, pauseSong}) => {

    return (
        <div>
            {
                headerTitle === 'Albums' ?
                    (<AlbumList audioControl={audioControl}/>) :
                    headerTitle === 'Artists' ?
                        (<ArtistList/>) :
                        (headerTitle === 'Browse') ?
                            (<BrowseView/>) :
                            (headerTitle === 'PreSave') ?
                                (<PreSaveView/>) :
                                (<SongList resumeSong={resumeSong} pauseSong={pauseSong} audioControl={audioControl}/>)

            }
        </div>
    );

};

MainView.propTypes = {
    headerTitle: PropTypes.string,
    audioControl: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func
};

export default MainView;
