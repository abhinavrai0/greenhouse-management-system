'use strict'
let Greenhouse = require('../models/greenhouse');
let CONSTANTS = require('../constants');
let SFTPClient = require('ssh2').Client;


// Get Greenhouse list
exports.getGreenhouseList = function (req, res) {
    Greenhouse.find()
        .exec(function (err, greenhouseList) {
            if(err){
                res.status(500);
                res.send('Unable to fetch Greenhouse List'+err);
            }else{
                res.send(greenhouseList);
            }
        });
};

// Get Greenhouse By Id
exports.getGreenhouseById = function (req, res) {
    Greenhouse.findOne({greenhouse_id: req.params.id})
        .exec(function(err,greenhouse){
            if(err){
                res.status(500);
                res.send("Cannot find requested Greenhouse: "+err);
            }else{
                res.send(greenhouse);
            }
        });
};

// Create a new Greenhouse
exports.addGreenhouse = function (req, res) {
    let greenhouse = req.body;
    let greenhouseInstance = new Greenhouse(greenhouse);

    greenhouseInstance.save(function (err) {
        if(err){
            res.status(500);
            res.send('Error creating Greenhouse: '+err);
        }else{
            res.send('Greenhouse created successfully');
        }
    });
};

// Update an existing Greenhouse
exports.updateGreenhouse = function (req, res) {
    let currentGreenhouse = req.body;

    Greenhouse.findOne({_id: currentGreenhouse._id},function(err, greenhouse){
        if(err){
            res.status(500);
            res.send('Cannot find Greenhouse to update'+err);
        }else{
            greenhouse.set(currentGreenhouse);
            greenhouse.save(function(err){
                if(err){
                    res.status(500);
                    res.send('Error saving Greenhouse update '+err);
                }else{
                    res.send('Greenhouse updated successfully');
                }
            });
        }
    });
};

// Delete given Greenhouse
exports.deleteGreenhouse = function (req, res) {
    Greenhouse.remove({_id:req.body._id},function (err) {
        if(err){
            res.status(500);
            res.send('Error removing Greenhouse'+err);
        }else{
            res.send('Greenhouse removed');
        }
    });
};

exports.getGreenhouseLightsScheduleById = function (req, res) {
    Greenhouse.findOne({greenhouse_id: req.params.id})
        .exec(function(err,greenhouse){
            if(err){
                res.status(500);
                res.send("Cannot find requested Greenhouse: "+err);
            }else{
                // Get the controller ip and filepath info from greenhouse and send the files content
                let greenhouseInfo = {
                    'controllerIP': greenhouse.greenhouse_light_controller.controller_ip,
                    'controllerSchedulerFilePath': greenhouse.greenhouse_light_controller.scheduler_file_path
                };
                // using the info retrieved, get the file from device
                // Get a SFTPClient object.
                let conn = SFTPClient();
                // define the handler for ready event.
                conn.on('ready', function () {
                    console.log('Client : ready');
                    conn.sftp(function (err, sftp) {
                        if(err){
                            res.status(500);
                            res.send('error creating a sftp connection to machine: '+ err);
                        }
                        // if sftp is successful then initiate a read dir command
                        sftp.readdir('/ChamberData', function (err, list) {
                            if(err){
                                conn.end();
                                res.status(500);
                                res.send('error fetching the contents of the directory: '+ err);
                            }
                            conn.end();
                            res.send(list);
                        });

                    });
                });

                let sftpConfig = {
                    host: CONSTANTS.REMOTE_MACHINE_IP,
                    username: CONSTANTS.REMOTE_MACHINE_USERNAME,
                    password: CONSTANTS.REMOTE_MACHINE_PASSWORD,
                    port: CONSTANTS.REMOTE_MACHINE_PORT,
                };

                conn.connect(sftpConfig);
            }
        });
};

exports.updateGreenhouseLightsScheduleById = function (req, res) {
    let greenhouseLightsScheduleReqObj = req.body;
    let greenhouseId = greenhouseLightsScheduleReqObj.greenhouse_id;
    let greenhouseLightsSchedule = greenhouseLightsScheduleReqObj.greenhouseLightsSchedule
    Greenhouse.findOne({greenhouse_id: greenhouseId})
        .exec(function(err,greenhouse){
            if(err){
                res.status(500);
                res.send("Cannot find requested Greenhouse: "+err);
            }else{
                // Get the controller ip and filepath info from greenhouse and update the files content
                let greenhouseInfo = {
                    'ControllerIP': greenhouse.greenhouse_light_controller.controller_ip,
                    'controllerSchedulerFilePath': greenhouse.greenhouse_light_controller.scheduler_file_path
                };
                res.send('Update Successful for GHID: '+greenhouse.greenhouse_id+' with schedule: '+ greenhouseLightsSchedule);
            }
        });
};