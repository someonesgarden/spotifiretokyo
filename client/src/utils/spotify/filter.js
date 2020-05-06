export default {

    trimSpace: function(val){
        val = val+"";
        val = val.replace(/^\s+|\s+$/g,'').replace(/ +/g,' ');
        val = val.trim().toLowerCase();
        return val;
    },

    filter_frequency:function(checkartist,freq){

        let selectedtracks = this.spotify.tracks;
        let ahash={};

        if(checkartist){
            selectedtracks.items.forEach(el => {

                if(el['track'].artists){

                    let artists = el['track'].artists;

                    artists.map(artist=>{
                        if(ahash[artist.id]!==undefined){
                            ahash[artist.id]++;
                        }else{
                            ahash[artist.id]=0;
                        }
                    });
                }
            });


            for(let i=0;i<selectedtracks.items.length;i++){

                let artists = selectedtracks.items[i].track.artists;
                let overs = [];

                artists.map(artist=>{
                    if(ahash[artist.id]>=freq){
                        //overs.push(ahash[artist.id])
                        overs.push("Y")
                    }else{
                        overs.push("N")
                    }
                });

                console.log("overs!",overs);
                this.a_spotify(['playlist','updateover',{'index':i, 'over':overs}]);

                //this.$store.commit('spotify/updateArtistsOver', {'index':i, 'over':overs});
            }
        }

        else{
            for(let i=0;i<selectedtracks.items.length;i++){
                this.a_spotify(['playlist','updateover',{'index':i, 'over':[]}]);
                //this.$store.commit('spotify/updateArtistsOver', {'index':i, 'over':[]});
            }
        }
    },

    filter_ng_action:function(ngs){
        let ng_labels = ngs.labels;
        let selected_tracks  = this.spotify.tracks;
        let filtercopyrights = this.filter.copyright;


        for(let i=0;i<selected_tracks.items.length;i++){

            this.$store.commit('spotify/updateSearchStatus', {'index':i, 'flag':true});
            this.$store.commit('spotify/updateAlbumFlag', {'index':i, 'flag':false});

            let flag = false;

            let labelname = this.c_trim_space(selected_tracks.items[i].track.album.label);
            labelname = labelname.toLowerCase();

            let copyrights = '';

            if(filtercopyrights){
                copyrights = JSON.stringify(selected_tracks.items[i].track.album.copyrights);
            }

            if(!ng_labels){
                alert("フィルターファイルをアップロードするかリストから選んでください。");
                //this.$store.commit('filter/setOutputStep',Math.random()+1);
                this.a_filter(['set','step',Math.random()+1]);
                break;
            }
            else{
                for(let j=0; j< ng_labels.length;j++){

                    let nglabel = this.c_trim_space(ng_labels[j]);
                    nglabel = nglabel.trim();

                    let nglabelLowerCase = nglabel.toLowerCase();
                    if(nglabelLowerCase === labelname.trim()){
                        flag = true;
                        break;
                    }

                    if(filtercopyrights) {
                        if (copyrights.indexOf(nglabel) != -1) {
                            flag = true;
                            break;
                        }
                    }
                }
                this.$store.commit('spotify/updateAlbumFlag', {'index':i, 'flag':flag});
            }

        }
        //this.$store.commit('filter/setOutputStep',2);
        this.a_filter(['set','step',2]);
    },

    filter_ng_load:function(uploadfilter, checkartist=false, artistfreq=0){
        let that = this;

        this.filter_frequency(checkartist,artistfreq);

        if(uploadfilter){
            that.filter_ng_action(this.filter.ngs);

        }else{
            let data = {
                filterurl: this.filter.selected
            };
            let params = new URLSearchParams();
            params.append('data', JSON.stringify(data));

            axios.post('/filter/loadfilter', params)
                .then(res => {
                    console.log('Filter load OK');
                    let json = res.data.data;
                    let data = JSON.parse(json);
                    that.$store.commit('filter/setNGs', data.blacklist);
                    that.filter_ng_action(data.blacklist);
                }).catch(error => {
                console.log(error);
            })

        }
    },

    filter_remove_ngtracks:function(uid, pid){

        let ngtracks = this.filter.ngtracks;
        let data = {
            uid:uid,
            pid:pid,
            snapshotid:this.spotify.playlist.snapshot_id,
            ngtracks:ngtracks
        };

        let params = new URLSearchParams();
        params.append('data', JSON.stringify(data));

        axios.post('/spotify/deletetracks', params)
            .then(res => {
                console.log('delete '+ngtracks.length+'tracks. OK');
                window.alert(ngtracks.length+'トラックを削除しました');
            }).catch(error => {
            console.log(error);
        });
    }

}
