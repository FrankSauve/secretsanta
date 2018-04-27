const mongoose = require('mongoose');

// Exchange schema
const exchangeSchema = mongoose.Schema({
    name: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    guests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guests',
    }],
});

const Exchange = module.exports = mongoose.model('Exchange', exchangeSchema);

module.exports.getExchangeById = function(id, callback) {
    const query = {id: id};
    Exchange.findOne(query, callback);
};

module.exports.addExchange = function(newExchange, callback) {
    newExchange.save(callback);
};
