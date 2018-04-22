'use strict'

let mongoose = require('mongoose');
let constants = require('../constants');

module.exports = function () {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://127.0.0.1/phytotron_greenhouse_management_database',{
        /*
        user: constants.MONGO_DB_USER_NAME,
        pass: constants.MONGO_DB_USER_PASSWORD,
        auth: {
            authdb: constants.MONGO_DB_USER_ROLE // this is the name of the database to authenticate against and not the role type.
       }
    */
    });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

    return db;
};