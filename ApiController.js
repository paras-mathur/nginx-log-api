const express = require('express');
const router = express.Router();
const LogService = require('./LogService');
const logService = new LogService().getInstance();

// Endpoint to get top 10 frequenct vistor IPs and their count
router.get('/host-freq', function (req, res) {
    res.send( logService.freqList() );
});

// Endpoint to frequency of different HTTPs values
router.get('/status-freq', function (req, res) {
    res.send( logService.statusFreqList() );
});

// Endpoint to get the peak hour of traffic and
// corresponding count value
router.get('/peak-hour', function (req, res) {
    res.send( logService.getMaxTrafficHour() );
});

// Endpoint to maximum bytes served in an hour and 
// value of that hour
router.get('/byte-max', function (req, res) {
    res.send( logService.getMaxBytesHour() );
});

module.exports = router;