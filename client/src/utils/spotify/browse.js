/* eslint-disable */

export default{
    c_reco:function(cb=null){
        let queries = {};
        let gen = this.spotify.gen;
        let val = gen.val;
        let range = gen.range;
        let seeds = gen.seeds;

        Object.keys(val).forEach(key=>{

            switch(range[key]){
                case 'max':
                case 'min':
                case 'target':
                    queries[range[key]+'_'+key] = val[key];
                    break;
                case 'gp001':
                    queries['min_'+key] = val[key]-0.01;
                    queries['max_'+key] = val[key]+0.01;
                    break;
                case 'gp005':
                    queries['min_'+key] = val[key]-0.05;
                    queries['max_'+key] = val[key]+0.05;
                    break;
                case 'gp010':
                    queries['min_'+key] = val[key]-0.1;
                    queries['max_'+key] = val[key]+0.1;
                    break;
                case 'gp100':
                    queries['min_'+key] = val[key]-1;
                    queries['max_'+key] = val[key]+1;
                    break;
                case 'gp200':
                    queries['min_'+key] = val[key]-2;
                    queries['max_'+key] = val[key]+2;
                    break;
                case 'gp500':
                    queries['min_'+key] = val[key]-5;
                    queries['max_'+key] = val[key]+5;
                    break;
                case 'gp800':
                    queries['min_'+key] = val[key]-8;
                    queries['max_'+key] = val[key]+8;
                    break;
                case true:
                    queries[key] = val[key];
                    break;
            }
        });

        seeds.forEach(seed => {
            switch (seed.type) {
                case 'TRACK':
                    if(seed.id) {
                        if (!queries.seed_tracks) queries.seed_tracks=[];
                        queries.seed_tracks.push(seed.id);
                    }
                    break;
                case 'GENRE':
                    if(seed.id) {
                        if (!queries.seed_genres) queries.seed_genres=[];
                        queries.seed_genres.push(seed.id);
                    }
                    break;
                case 'ARTIST':
                    if(seed.id){
                        if(!queries.seed_artists) queries.seed_artists=[];
                        queries.seed_artists.push(seed.id);
                    }
                    break;
            }
        });

        console.log(queries);

        const conditions = {
            queries:queries,
            access_token:this.spotify.credential.access_token
        };

        axios.post('https://emory.tokyo/spotify/browse/recommendations',conditions)
            .then(res => {
                console.log(res);
                this.a_spotify(['set','generated',res.data]);
                this.a_spotify(['update','item','generated']);
                if(cb) cb(res);
            }).catch(error => {
            console.log(error);
            if(cb) cb(null);
        });
    }
}
