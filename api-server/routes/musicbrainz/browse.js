let express     = require('express');
let router      = express.Router();
let MusicbrainzApi = require('musicbrainz-api').MusicBrainzApi;

const mbApi = new MusicbrainzApi({
    appName: 'spotifire-tokyo',
    appVersion: '2.0',
    appMail: 'd@someonesgarden.org'
});

//id:'ab2528d9-719f-4261-8098-21849222a0f2'
router.get('/getArtist',(req,res)=>{
    const id   = req.query.id;
    mbApi.getArtist(id)
        .then(data=> res.send(data))
        .catch(err=>{
        console.log(err);
        res.send(null);
    })
});

router.get('/getWork',(req,res)=>{
    const id   = req.query.id;
    mbApi.getWork(id)
        .then(data=> res.send(data))
        .catch(err=> {
        console.log(err);
        res.send(null);
    })
});

//type= [artist, release, release-group, recording, work, label]
//api/musicbrainz/browse/search?type=recording&key=isrc&val=JPVI07700040
router.get('/search',(req,res)=>{
    const type   = req.query.type;
    const key    = req.query.key;
    const val    = req.query.val;
    let param = {};
    param[key] = val;
    mbApi.search(type, param).then(data=> res.send(data))
        .catch(err=>{
        console.log(err);
        res.send(null);
    })
});


router.get('/searchTrackInRecording',(req,res)=>{
    const isrc          = req.query.isrc;
    const track_name    = req.query.track_name ? req.query.track_name.toLowerCase() : '';
    mbApi.search('recording', {isrc:isrc}).then(data=> {
        if(data.recordings && data.recordings.length>0){
            let releases = data.recordings[0].releases;
            if(releases) releases = releases.map(rel=>{return {format:rel.media[0].format, ...rel.media[0].track[0]}});
            if(releases) releases = releases.filter(rel=> rel.format==='CD' && rel.title.toLowerCase().indexOf(track_name) !== -1);
            res.send(data);
        }else{
            res.send(null);
        }

    }).catch(err=>{
            console.log(err);
            res.send(null);
        })
});

router.get('/searchRecording',(req,res)=>{
    const isrc          = req.query.isrc;
    mbApi.search('recording', {isrc:isrc}).then(data=> {

        if(data.recordings && data.recordings.length>0){
            let releases = data.recordings[0].releases;
            if(releases) releases = releases.map(rel=>{return {format:rel.media[0].format, ...rel.media[0].track[0]}});
            if(releases) releases = releases.filter(rel=> rel.format==='CD');
            res.send(releases);
        }else{
            res.send(null);
        }

    }).catch(err=>{
        console.log(err);
        res.send(null);
    })
});

module.exports = router;
