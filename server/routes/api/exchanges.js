const express = require('express'),
    exchanges = express.Router(),
    Exchange = require('../../models/exchanges'),
    config = require('../../config/database');

exchanges.post('/addexchange', (req, res) => {
    let newExchange = new Exchange({
        name: req.body.name,
        users: req.body.users,
        guests: req.body.guests
    });
    Exchange.addExchange(newExchange, (err, data) => {
        if (err) {
            return res.json({ success: false });
        }
        return res.json(data);
    });
});

module.exports = exchanges;