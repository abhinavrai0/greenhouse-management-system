'use strict'
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GreenhouseSchema = new Schema({

    greenhouse_id: {
        type: String,
        required: true
    },

    greenhouse_name: String,

    greenhouse_light_controller: {

        controller_ip: String,

        scheduler_file_path: String
    }
});

module.exports = mongoose.model('Greenhouse', GreenhouseSchema);