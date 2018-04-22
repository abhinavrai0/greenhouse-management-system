'use strict'
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GreenhouseSchema = new Schema({

    greenhouse_id: {
        type: String,
        required: true
    },

    greenhouse_name: String,

    greenhouse_controllers: [
        {

            controller_id: {
                type: String,
                required: true
            },

            controller_ip: String,

            scheduler_files: [
                {
                    file_path: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Greenhouse', GreenhouseSchema);