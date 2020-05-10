let express = require('express');
let router = express.Router();
const common = require('../../common');



//getNewReleases
router.get('/new-releases', (req,res)=>{
    common.execApi('/v1/browse/new-releases', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getFeaturedPlaylists
router.get('/featured-playlists', (req,res)=>{
    common.execApi('/v1/browse/featured-playlists', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getCategories
router.get('/categories', (req,res)=>{
    common.execApi('/v1/browse/categories', 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getCategory
router.get('/categories/:categoryId', (req,res)=>{
    let categoryId  = req.params.categoryId;
    common.execApi('/v1/browse/categories/' + categoryId, 'get', null, req,(result)=>{
        res.send(result);
    });
});

//getPlaylistsForCategory
router.get('/categories/:categoryId/playlists', (req,res)=>{
    let categoryId  = req.params.categoryId;
    common.execApi('/v1/browse/categories/' + categoryId + '/playlists', 'get', null, req,(result)=>{
        res.send(result);
    });
});


module.exports = router;
