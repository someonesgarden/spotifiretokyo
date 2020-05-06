import React from 'react';
import PropTypes from 'prop-types';
import TrackSearch from '../TrackSearch';

const SideMenu = ({
  updateHeaderTitle,
  updateViewType,
  fetchFeatured,
  fetchRecentlyPlayed,
  fetchSongs,
  fetchAlbums,
  fetchArtists,
  access_token,
  title,
  artistIds
}) => {


  const handleClick = (name)  => {
    updateHeaderTitle(name);
    updateViewType(name);
  };

  const handleBrowseClick = ()  => {
    updateHeaderTitle('Browse');
    updateViewType('Featured');
    fetchFeatured(access_token);
  };

  const renderSideMenu = () => {
    const menu = [
      {
        name: 'Recently Played',
        action: fetchRecentlyPlayed
      },
      {
        name: 'Songs',
        action: fetchSongs
      },
      {
        name: 'Albums',
        action: fetchAlbums
      },
      {
        name: 'Artists',
        action: fetchArtists,
        getArtists: true
      }
    ];

    return menu.map(item => {
      return (
        <li key={ item.name }
          className={title === item.name ? 'active side-menu-item': 'side-menu-item'}
          onClick={() => {
            item.getArtists ? item.action(access_token, artistIds) : item.action(access_token);
            handleClick(item.name); }
          }>
          { item.name }
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <TrackSearch/>
      <ul className='side-menu-container'>
        <li onClick={ handleBrowseClick } className={title === 'Browse' ? 'active side-menu-item': 'side-menu-item'}>Browse</li>
        <li className='side-menu-item radio'>Radio</li>
        <h3 className='user-library-header'>Your Library</h3>
        {
          renderSideMenu()
        }
      </ul>
    </React.Fragment>
  );

};


export default SideMenu;
