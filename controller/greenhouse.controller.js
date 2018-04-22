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
    let greenhouse = req.body;
    Greenhouse.findOne({_id: greenhouse._id},function(err, greenhouse){
        if(err){
            res.status(500);
            res.send('Cannot find Greenhouse to update'+err);
        }else{
            greenhouse.set(greenhouse);
            greenhouse.save(function(err){
                if(err){
                    res.status(500);
                    res.send('Error saving Greenhouse update '+err);
                }else{
                    res.send('Greenhouse saved successfully');
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