'user strict'
let express = require('express');
let router = express.Router({});

let NoteController = require('../controller/note.controller');
let GreenhouseController = require('../controller/greenhouse.controller');
let ApplicationSettingsController = require('../controller/application-settings.controller');

// Settings Routes //-------------------------------------------------

// Home Route //-------------------------------------------------
// Get All the Notes
router.get('/notes', NoteController.getNoteList);

// Create a Note
router.post('/note/create', NoteController.addNote);

// Update an existing note
router.post('/note/update', NoteController.updateNote);

// Delete a note
router.post('/note/delete', NoteController.deleteNote);

// Greenhouse Routes //-------------------------------------------------
// Get a list of all the greenhouses
router.get('/greenhouses', GreenhouseController.getGreenhouseList);

// Create a Greenhouse
router.post('greenhouse/create', GreenhouseController.addGreenhouse);

// Update an existing greenhouse
router.post('greenhouse/update', GreenhouseController.updateGreenhouse);

// Delete a greenhouse
router.post('greenhouse/delete', GreenhouseController.deleteGreenhouse);


// Get Application Settings
router.get('/applicationSettings', ApplicationSettingsController.getApplicationSettings);

// Set Application Settings
router.post('/applicationSettings', ApplicationSettingsController.setApplicationSettings);

module.exports = router;
