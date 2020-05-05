import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UserPlaylists.css';

class UserPlaylists extends Component {

  componentWillReceiveProps (nextProps) {
    if(nextProps.userId !== '' && nextProps.token !== '' && nextProps.playlistMenu.length===0) {
      console.log("nextProps", nextProps);
      this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.token);
    }
  }

  renderPlaylists() {
    return this.props.playlistMenu.map(playlist => {
      const getPlaylistSongs = () => {
        this.props.fetchPlaylistSongs(playlist.owner.id, playlist.id, this.props.token);
        this.props.updateHeaderTitle(playlist.name);
      };

      return (
        <li onClick={ getPlaylistSongs } className={this.props.title === playlist.name ? 'active side-menu-item' : 'side-menu-item'} key={ playlist.id }>
          { playlist.name }
        </li>
      );
    });
  }

  render() {

    //console.log("this.props.playlistReducer!!", this.props.playlistReducer);

    return (
      <div className='user-playlist-container'>
        <h3 className='user-playlist-header'>Playlists</h3>
        {
          this.props.playlistMenu && this.renderPlaylists()
        }
      </div>
    );
  }
}

UserPlaylists.propTypes = {
  userId: PropTypes.string,
  token: PropTypes.string,
  title: PropTypes.string,
  playlistMenu:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  fetchPlaylistsMenu: PropTypes.func,
  fetchPlaylistSongs: PropTypes.func,
  updateHeaderTitle: PropTypes.func
};

export default UserPlaylists;
