'use strict'
let Greenhouse = require('../models/greenhouse');


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