import React from 'react';
import PropTypes from 'prop-types';

const AlbumList = ({ songs, audioControl }) => {

  let id = 0;

  const renderAlbums = () => {

    return songs.map((song, i) => {
      return (
        <li
          onClick={() => { audioControl(song); } }
          className='album-item'
          key={ i }
        >
          <div className='album-inner'>

            <div className='album-image'>
              <img src={song.track.album.images[0].url} />
              <div className='play-song'>
                <i className="fa fa-play-circle-o play-btn" aria-hidden="true" />
              </div>
            </div>

            <div className='album-details'>
              <p className='album-name'>{ song.track.album.name }</p>
              <p className='artist-name'>{ song.track.album.artists[0].name }</p>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <ul className='album-view-container'>
      {renderAlbums()}
    </ul>
  );

};

AlbumList.propTypes = {
  songs: PropTypes.array,
  audioControl: PropTypes.func
};

export default AlbumList;
