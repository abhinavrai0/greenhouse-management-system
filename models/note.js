'use strict'
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    created_by: String,
    created_on: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Note', NoteSchema);