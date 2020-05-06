import React, { Component } from 'react';
import moment from 'moment/moment';
import Button from "@material-ui/core/Button";

class SongList extends Component {

  componentWillReceiveProps (nextProps) {
    if(nextProps.access_token !== '' && !nextProps.fetchSongsError && nextProps.fetchSongsPending && nextProps.viewType === 'songs') {
      this.props.fetchSongs(nextProps.access_token);
    }
  }

  msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  renderSongs() {
    return this.props.songs.map((song, i) => {
      const buttonClass = song.track.id === this.props.songId && !this.props.songPaused ? "fa-pause-circle-o" : "fa-play-circle-o";

      return (
        <li className={song.track.id === this.props.songId ? 'active user-song-item' : 'user-song-item'} key={ i }>

          <div onClick={() => {(song.track.id === this.props.songId) && this.props.songPlaying && this.props.songPaused ? this.props.resumeSong() :
            this.props.songPlaying && !this.props.songPaused && (song.track.id === this.props.songId)  ? this.props.pauseSong() :
              this.props.audioControl(song); } } className='play-song'>
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"/>
          </div>

          <div className='song-title'>
            <p className='title'>{ song.track.name }</p>
            <p className='album'>from "{ song.track.album.name }"</p>
            <p className='artist'>by { song.track.artists[0].name }</p>
            <p className='song-added'>{ moment(song.added_at).format('YYYY/MM/DD')}</p>
            <p className='song-length'>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</p>
          </div>

          <div className="lyrics">
            <Button variant="outlined" color="primary" size="small">MusicBrainz</Button>
            <Button variant="outlined" color="secondary" size="small">MusixMatch</Button>
            <Button variant="contained" color="primary" size="small">KGet</Button>
            <Button variant="contained" color="secondary" size="small">Genius</Button>
          </div>

        </li>
      );
    });
  }

  render() {

    return (
      <div>
        <div className='song-header-container'>
          <div className='song-title-header'>
          </div>

        </div>
        {
          this.props.songs && !this.props.fetchSongsPending && !this.props.fetchPlaylistSongsPending && this.renderSongs()
        }

      </div>
    );
  }
}


export default SongList;
