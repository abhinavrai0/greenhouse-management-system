'use strict'

// EXPORTS for service
exports.getApplicationSettings = function (req, res) {
    // No settings so far
    let applicationSettings = {};
    res.send(applicationSettings);
};

exports.setApplicationSettings = function (req, res) {
    let  applicationSettings = req.body;
    res.send('Application Settings Updated Successfully');
};