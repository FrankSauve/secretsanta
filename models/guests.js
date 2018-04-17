const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
});

const Guest = module.exports = mongoose.model('Guest', guestSchema);

module.exports.getGuestById = function(id, callback) {
    const query = {id: id};
    Guest.findOne(query, callback);
};

module.exports.addGuest = function(newGuest, callback) {
    newGuest.save(callback);
};
