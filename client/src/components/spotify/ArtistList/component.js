/* eslint-disable */

import React from 'react';

const ArtistList = ({ artists, fetchArtistSongs, access_token, updateHeaderTitle }) => {

  const renderArtists = () => {
    return artists.map((artist, i) => {

      const artistSongsAction = (artist, access_token) => {
        fetchArtistSongs(artist.id, access_token);
        updateHeaderTitle(artist.name);
      };

      return (
        <li onClick={() => {artistSongsAction(artist, access_token); } } className='artist-item' key={ i }>
          <a>
            <div>
              <div className='artist-image'>
                <img src={artist.images[0] ? artist.images[0].url : ''} />
              </div>
              <div className='artist-details'>
                <p>{ artist.name }</p>
              </div>
            </div>
          </a>
        </li>
      );
    });
  };

  return (
    <ul className='artist-view-container'>
      {
        artists && renderArtists()
      }
    </ul>
  );

};

export default ArtistList;
