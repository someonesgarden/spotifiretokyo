const Sequelize = require('sequelize');
const keys = require('../../../keys');
const sequelize = new Sequelize(keys.mysqlDatabase,keys.mysqlUser,keys.mysqlPassword,
    {
        host:keys.mysqlHost,
        dialect:'mysql'
    });

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});


module.exports = {
    Users:Users
}
