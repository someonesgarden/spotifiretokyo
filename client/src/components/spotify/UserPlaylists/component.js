/* eslint-disable */

import React, { Component } from 'react';

class UserPlaylists extends Component {

  componentWillReceiveProps (nextProps) {
    if(nextProps.userId !== '' && nextProps.access_token !== '' && nextProps.playlistMenu.length===0) {
      console.log("nextProps", nextProps);
      this.props.fetchPlaylistsMenu(nextProps.userId, nextProps.access_token);
    }
  }

  renderPlaylists() {
    return this.props.playlistMenu.map(playlist => {
      const getPlaylistSongs = () => {
        this.props.fetchPlaylistSongs(playlist.owner.id, playlist.id, this.props.access_token);
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


export default UserPlaylists;
