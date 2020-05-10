/* eslint-disable */

export default {
    c_msToMinutesAndSeconds(ms){
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },

    c_msTimeLeft(stream){
        return stream.item ? Math.floor(stream.item.duration_ms/1000 - stream.progress_ms/1000) : 0;
    },

    c_imgCheck(track){
        return (track && track.album && track.album.images.length>0) ? track.album.images[0].url : null
    },

    c_trackCheck(track){
        return (track && track.name) ? (track.name.length>12 ?  track.name.slice(0,12)+'..' :  track.name) : ''
    },

    c_artistCheck(track){
        return (track && track.artists.length>0) ? (track.artists[0].name.length>12 ? track.artists[0].name.slice(0,12)+'..' : track.artists[0].name) : ''
    },

    c_deci(val,deg=1000,mul=1){
        return Math.floor(val*deg * mul)/deg
    },

    c_idValid(id){
        const reg = new RegExp(/^([a-zA-Z0-9]{22})$/); //２２文字の英数字以外は認めない。
        return reg.test(id);
    }
}
