/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

const BrowseView = ({ view, viewType, access_token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem ,albumGetAlbum, getGenrePlaylists}) => {

  let browseView;

  if(view) {

    browseView = view.map((item, i) => {

      const getPlaylistSongs = () => {
        addPlaylistItem(item);
        fetchPlaylistSongs(item.owner.id, item.id, access_token);
        updateHeaderTitle(item.name);
      };

      const browseItemClick = () => {
        switch (viewType) {
          case 'Featured':
          case 'genreplaylist':
          case 'myplaylist':
            getPlaylistSongs(item);
            break;
          case 'New Releases':
            albumGetAlbum(access_token, item);
            break;
          case 'Genres':
            getGenrePlaylists(access_token, item.id);
            break;
        }
      };



      return(
        <li onClick={()=>browseItemClick()}  className='category-item' key={ i }>
          <div className='category-image'>
            <img src={ item.icons ? item.icons[0].url : item.images[0].url} />
            {viewType === 'Genres' && (
              <p className='category-name'>{ item.name }</p>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <ul className='browse-view-container'>
      { browseView }
    </ul>
  );
};


export default BrowseView;
