import React, { Component } from 'react';
import moment from 'moment/moment';
import Button from "@material-ui/core/Button";


class SongList extends Component {

  constructor(props){
    super(props);
    this.lyricsAction = this.lyricsAction.bind(this);
  }

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

  lyricsAction(type,val){
    const {mbtracks} = this.props;
    const {mbIsrcTracks,mmGetLyrics} = this.props;


    if(type==='musicbrainz'){

      const song = val;
      const isrc = song && song.track && song.track.external_ids && song.track.external_ids.isrc;
      mbIsrcTracks(isrc);
    }else if(type==='musixmatch'){
      const isrc = val;
      const mbid0 = mbtracks[isrc][0] && mbtracks[isrc][0].id;
      mmGetLyrics(mbid0);

    }


  }

  renderSongs() {
    const {songs,songId,songPaused,songPlaying,mbtracks} = this.props;
    const {resumeSong,pauseSong,audioControl} = this.props;

    console.log("mbtracks",mbtracks);

    return songs.map((song, i) => {

      const isrc = song && song.track && song.track.external_ids && song.track.external_ids.isrc;
      const buttonClass = song.track.id === songId && !songPaused ? "fa-pause-circle-o" : "fa-play-circle-o";

      return (
        <li className={song.track.id === songId ? 'active user-song-item' : 'user-song-item'} key={ i }>

          <div onClick={() => {(song.track.id === songId) && songPlaying && songPaused ? resumeSong() :
            songPlaying && !songPaused && (song.track.id === songId)  ? pauseSong() :
              audioControl(song); } } className='play-song'>
            <i className={`fa ${buttonClass} play-btn`} aria-hidden="true"/>
          </div>

          <div className='song-title'>
            <p className="isrc">{isrc}</p>
            <p className='title'>{ song.track.name }</p>
            <p className='album'>from "{ song.track.album.name }"</p>
            <p className='artist'>by { song.track.artists[0].name }</p>
            <p className='song-added'>{ moment(song.added_at).format('YYYY/MM/DD')}</p>
            <p className='song-length'>{ this.msToMinutesAndSeconds(song.track.duration_ms) }</p>
          </div>

          {

            isrc && (
                <React.Fragment>
                  <div className={['lyrics', mbtracks[isrc] ? 'searched' : ''].join(' ')}>
                    {mbtracks[isrc] && <p className='mb_info'>{mbtracks[isrc].length} tracks in MusicBrainz.</p>}
                  </div>

                <div className="lyricsBtns">
                  {
                    !mbtracks[isrc] && <Button variant="contained" style={{backgroundColor:'#1bd6ab'}} size="small" onClick={()=> this.lyricsAction('musicbrainz',song)}>MusicBrainz</Button>
                  }

                  {
                    mbtracks[isrc] && mbtracks[isrc].length>0 && (
                       <React.Fragment>
                         <Button variant="contained" style={{backgroundColor:'#d6433b',color:'white'}} size="small" onClick={()=>this.lyricsAction('musixmatch',isrc)}>MusixMatch</Button>
                         <Button variant="contained" color="primary" size="small">Kashi-Get</Button>
                         {/*<Button variant="contained" color="secondary" size="small">Genius</Button>*/}
                       </React.Fragment>
                    )
                  }

                </div>
                </React.Fragment>
            )

          }

        </li>
      );
    });
  }

  render() {

    const {songs,fetchSongsPending,fetchPlaylistSongsPending,mbtracks} = this.props;


    console.log("mbtracks",mbtracks);


    return (
      <div>
        <div className='song-header-container'>
          <div className='song-title-header'>
          </div>

        </div>
        {
          songs && !fetchSongsPending && !fetchPlaylistSongsPending && this.renderSongs()
        }

      </div>
    );
  }
}


export default SongList;
