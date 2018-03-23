const express = require('express'),
users = express.Router(),
User = require('../models/user'),
passport = require('passport'),
jwt = require('jsonwebtoken'),
config = require('../config/database');


/**
 * POST /register
 * @param user 
 */
users.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.getUserByUsername(newUser.username, (err, data) => {
        if (err) throw err;
        if (data == undefined) {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: "Failed to register user" });
                }
                else {
                    res.json({ success: true, msg: "User registered" });
                }
            });
        }
        else {
            if (newUser.username == data.username) {
                res.json({ success: false, msg: "Username already exists" });
            }
        }
    });
});

/**
 * POST /authenticate
 * @param user
 * @return user
 */
users.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        });
    });
});

/**
 * GET /profile
 * @return user
 */
users.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.getUserById(req.params.id, (err, user) => {
        res.json({ user: user });
    });
});

/**
 * DELETE /delete
 * @param user
 */
users.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.deleteUserById(req.params.id, (err, user) => {
        if (err) throw err;
        res.json({success: true});
    });
});


module.exports = users;

