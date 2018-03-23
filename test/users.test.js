process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require("../models/user.js");
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

let token = '';
let id = '';

chai.use(chaiHttp);

/**
 * Register test
 */
describe('POST /register', () => {
    it('should register a new user', (done) => {
        let user = {
            name: "tester",
            email: "tester@email.com",
            username: "tester",
            password: "tester"
        }
        chai.request(app).post('/users/register')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a('object'); 
            res.body.success.should.be.eql(true);
            res.body.msg.should.be.eql("User registered");
            done();
        });
    });
});

/**
 * Login/Authenticate test
 */
describe('POST /authenticate', () => {
    it('should authenticate a new user and return a user object', (done) => {
        let user = {
            username: "tester",
            password: "tester"
        }
        chai.request(app).post('/users/authenticate')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a('object'); 
            res.body.success.should.be.eql(true);
            res.body.user.should.be.a('object');
            res.body.user.username.should.be.eql('tester');
            res.body.user.email.should.be.eql('tester@email.com');
            this.token = res.body.token;
            this.id = res.body.user.id;
            done();
        });
    });
});

/**
 * Get user test
 */
describe('GET /:id', () => {
    it('should return a user by id', (done) => {
        chai.request(app).get('/users/' + this.id)
        .set('Authorization', this.token)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a('object'); 
            res.body.user._id.should.be.eql(this.id);
            res.body.user.name.should.be.eql('tester');
            res.body.user.email.should.be.eql('tester@email.com');
            res.body.user.username.should.be.eql('tester');
            done();
        });
    });
});

/**
 * Delete user test
 */
describe('DELETE /:id', () => {
    it('should delete a user by id', (done) => {
        chai.request(app).delete('/users/' + this.id)
        .set('Authorization', this.token)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a('object'); 
            res.body.success.should.be.eql(true);
            done();
        });
    });
});