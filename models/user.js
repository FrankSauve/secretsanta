const mongoose = require('mongoose');
bcrypt = require('bcryptjs');
config = require('../config/database');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = module.exports = mongoose.model('User', userSchema);

/**
 * Gets a user by Id
 * @param {*} id
 * @param {*} callback
 */
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
},

/**
 * Gets a user by username
 * @param {*} username
 * @param {*} callback
 */
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
},

/**
 * Adds a user to the DB
 * @param {*} newUser
 * @param {*} callback
 */
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
},

/**
 * Compare the candidate password with the hashed password
 * @param {*} candidatePassword
 * @param {*} hash
 * @param {*} callback
 */
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
},

/**
 * Deletes a user by id
 * @param {*} id
 * @param {*} callback
 */
module.exports.deleteUserById = function(id, callback) {
    let user = User.findById(id);
    User.deleteOne(user, callback);
};
