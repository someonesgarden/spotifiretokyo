import React from 'react';

const MainHeader = ({
  pauseSong,
  resumeSong,
  fetchCategories,
  fetchNewReleases,
  fetchFeatured,
  updateHeaderTitle,
  updateViewType,
  songPaused,
  headerTitle,
  viewType,
  playlists,
  access_token,
  artists
}) => {

  let currentPlaylist;
  let currentArtist;

  if(viewType === 'playlist') {
    currentPlaylist = playlists.filter(playlist => {
      return playlist.name === headerTitle;
    })[0];
  }

  if(viewType === 'Artist' && artists.length > 0) {
    currentArtist = artists.filter(artist => {
      return artist.name === headerTitle;
    })[0];
  }

  return (

    <div className='section-title'>
      {viewType === 'playlist' && (
        <div className='playlist-title-container'>
          <div className='playlist-image-container'>
            <img className='playlist-image' src={currentPlaylist.images[0] ? currentPlaylist.images[0].url : null} />
          </div>
          <div className='playlist-info-container'>
            <p className='playlist-text'>PLAYLIST</p>
            <h3 className='header-title'>{headerTitle}</h3>
            <p className='created-by'>Created By: <span className='lighter-text'>{currentPlaylist.owner.display_name}</span> - {currentPlaylist.tracks.total} songs</p>


          </div>
        </div>
      )}

      {viewType === 'Artist' && currentArtist && (
        <div>
          <div className='current-artist-header-container'>
            <img className='current-artist-image' src={currentArtist.images[0].url} />
            <div className='current-artist-info'>
              <p>Artist from your library</p>
              <h3>{currentArtist.name}</h3>
            </div>
          </div>
        </div>
      )}

      {(
        headerTitle === 'Songs'||
				headerTitle === 'Recently Played' ||
				headerTitle === 'Albums' ||
				headerTitle === 'Artists') && (
          <div>
            <h3 className='header-title'>{headerTitle}</h3>

          </div>
        )}
      {(headerTitle === 'Browse') && (
        <div>
          <h3 className='header-title'>{headerTitle}</h3>
          <div className='browse-headers'>
            <p className={viewType === 'Genres' ? 'active' : ''} onClick={() => { fetchCategories(access_token); updateViewType('Genres'); updateHeaderTitle('Browse'); }}>Genres</p>
            <p className={viewType === 'New Releases' ? 'active' : ''} onClick={() => { fetchNewReleases(access_token); updateViewType('New Releases'); updateHeaderTitle('Browse'); }}>New Releases</p>
            <p className={viewType === 'Featured' ? 'active' : ''} onClick={() => { fetchFeatured(access_token); updateViewType('Featured'); updateHeaderTitle('Browse'); }}>Featured</p>
          </div>
        </div>
      )}
    </div>

  );
};


export default MainHeader;
