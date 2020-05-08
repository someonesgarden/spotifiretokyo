import React, { Component } from 'react';
import moment from 'moment/moment';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import Loader from 'react-loader-spinner'

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
    const {mbIsrcTracks,kgGetLyrics} = this.props;

    if(type==='musicbrainz'){
      const song = val;
      const isrc = song && song.track && song.track.external_ids && song.track.external_ids.isrc;
      mbIsrcTracks(isrc);

    }else if(type==='musixmatch'){

      this._fetchMMLyricses(val);

    }else if(type==='kget'){

      const song = val;
      if(song && song.track) {
        const name = song.track.name;
        const artist = song.track.artists && song.track.artists[0].name;
        const isrc = song.track && song.track.external_ids && song.track.external_ids.isrc;

        kgGetLyrics(isrc,name,artist)

        this.setState({loading:true})
      }
    }
  }


  _fetchMMLyricses(isrc){
    const {base_url,mmGetLyricsOK,mbtracks} = this.props;
    const api       = axios.create();
    let queries = [];

    mbtracks[isrc].map(track=> {
      queries.push(
          api.get(`${base_url}/musixmatch/track/trackLyrics?mbid=${track.id}`))
    })

    queries = queries.slice(0,5);

    Promise.all(queries).then(res => {
      let ary = res.map(re => re.data.message && re.data.message.body && re.data.message.body.lyrics).filter(d=>d)
      let _ = (ary.length>0) ? mmGetLyricsOK(isrc,ary[0]) : mmGetLyricsOK(isrc,null)

    }).catch(err=>console.log(err));
  }


  renderSongs() {
    const {songs,songId,songPaused,songPlaying,mbtracks,mmlyrics,kglyrics,kgloading} = this.props;
    const {resumeSong,pauseSong,audioControl} = this.props;

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
                    {mmlyrics[isrc] && <p className='mm_lyrics'>[musixmatch] 「{mmlyrics[isrc]}」</p>}
                    {kglyrics[isrc] && <p className='kg_lyrics'>[歌詞ゲット] 「{kglyrics[isrc]}」</p>}
                    <Loader
                        className={['loader',kgloading ? 'visible' :null].join(' ')}
                        type="Puff"
                        color="#22EE33aa"
                        height={100}
                        width={100}//3 secs
                    />
                  </div>

                <div className="lyricsBtns">

                  {
                    !mbtracks[isrc] && <Button variant="contained" style={{backgroundColor:'#1bd6ab'}} size="small" onClick={()=> this.lyricsAction('musicbrainz',song)}>MusicBrainz</Button>
                  }

                  {
                    mbtracks[isrc] && (
                       <React.Fragment>

                         {
                           !mmlyrics[isrc] && mbtracks[isrc].length>0 && <Button variant="contained" style={{backgroundColor:'#d6433b',color:'white'}} size="small" onClick={()=>this.lyricsAction('musixmatch',isrc)}>MusixMatch</Button>
                         }

                         {
                           !kglyrics[isrc] &&  <Button variant="contained" color="primary" size="small" onClick={()=> this.lyricsAction('kget', song)} >Kashi-Get</Button>
                         }


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
