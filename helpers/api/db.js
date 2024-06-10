import getConfig from 'next/config';
import mysql from 'mysql';
import { Sequelize, DataTypes } from 'sequelize';

const { serverRuntimeConfig } = getConfig();

export const db = {
    initialized: false,
    initialize
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({  
    host : '66.23.226.51',
    user:'usmartco_test',
    password:'cEhTLAJEZ3g4X7HwLDkA',
    database:'usmartco_test',
    port:'3306',
    multipleStatements: true,
    ssl:{rejectUnauthorized:false}


});
   await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(user,database, password, {
        host: host,
        dialect: "mysql",
        port: port,
        connectionLimit: 10,
        socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
      });
    // init models and add them to the exported db object
    db.User = userModel(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: true });

    db.initialized = true;
}


function userModel(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}