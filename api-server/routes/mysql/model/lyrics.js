const Sequelize = require('sequelize');
const keys = require('../../../keys');
const sequelize = new Sequelize(keys.mysqlDatabase,keys.mysqlUser,keys.mysqlPassword,
    {
        port:keys.mysqlPort,
        host:keys.mysqlHost,
        dialect:'mysql',
        dialectOptions: {
            ssl: false
        }
    });

const Lyrics = sequelize.define('lyrics', {
    id          : { field: 'id',            type: Sequelize.INTEGER(11),   primaryKey:true, autoIncrement: true  }, // INT(11)      NOT NULL  PRIMARY KEY  AUTO_INCREMENT
    artist      : { field: 'artist' ,       type: Sequelize.STRING(100),   allowNull: false                      }, // VARCHAR(100) NOT NULL
    song        : { field: 'song' ,         type: Sequelize.STRING(100),   allowNull: false                      }, // VARCHAR(100) NOT NULL
    type        : { field: 'type' ,         type: Sequelize.STRING(10),    allowNull: false                      }, // VARCHAR(100) NOT NULL
    thumb       : { field: 'thumb' ,        type: Sequelize.STRING(255)                                          }, // VARCHAR(100) NOT NULL
    genres      : { field: 'genres' ,       type: Sequelize.STRING(255)                                          }, // TEXT
    link        : { field: 'link' ,         type: Sequelize.STRING(125)                                          }, // VARCHAR(100)
    isrc        : { field: 'isrc' ,         type: Sequelize.STRING(30)                                           }, // VARCHAR(100)
    spotifyid   : { field: 'spotifyid',     type: Sequelize.STRING(30)                                           }, // VARCHAR(100)
    spotifytype : { field: 'spotifytype',   type: Sequelize.STRING(10)                                           }, // VARCHAR(100)
    lyrics      : { field: 'lyrics',        type: Sequelize.STRING(500)                                          }, // VARCHAR(500)
    morphs      : { field: 'morphs',        type: Sequelize.STRING(500)                                          }, // VARCHAR(500)
    liveness    : { field: 'liveness',      type: Sequelize.FLOAT                                          }, // FLOAT DEFAULT NULL
    valence     : { field: 'valence',       type: Sequelize.FLOAT                                          }, // FLOAT DEFAULT NULL
    danceability: { field: 'danceability',  type: Sequelize.FLOAT                                          }, // FLOAT DEFAULT NULL
    energy      : { field: 'energy',        type: Sequelize.FLOAT                                          }, // FLOAT DEFAULT NULL
    acousticness: { field: 'acousticness',  type: Sequelize.FLOAT                                          }, // FLOAT DEFAULT NULL
    tempo       : { field: 'tempo',         type: Sequelize.INTEGER(11)                                          }, // INT(11) DEFAULT NULL
    mode        : { field: 'mode',          type: Sequelize.INTEGER(11)                                          }, // INT(11) DEFAULT NULL

    createdAt   : { field: 'created_at',    type: Sequelize.DATE                                                 }, // DATETIME     NOT NULL  DEFAULT CURRENT_TIMESTAMP
    updatedAt   : { field: 'updated_at',    type: Sequelize.DATE                                                 }  // DATETIME     NOT NULL  DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP
});

module.exports = {
    Lyrics:Lyrics
}

/*
liveness
valence
danceability
energy
acousticness


tempo
mode
 */
