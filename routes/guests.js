const express = require('express'),
    guests = express.Router(),
    Guest = require('../models/guests'),
    config = require('../config/database');

guests.post('/addguest', (req, res) => {
    let newGuest = new Guest({
        name: req.body.name,
        email: req.body.email
    });
    Guest.addGuest(newGuest, (err, data) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

module.exports = guests;