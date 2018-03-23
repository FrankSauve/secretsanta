const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
passport = require('passport'),
mongoose = require('mongoose'),
config = require('./config/database');

// Connecting to database
mongoose.connect(config.database); 

// Successfully connects 
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
});

// Connection error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
});

const app = express();

// Port number
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, '/dist')));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// API Routes
app.use('/users', require('./routes/users'));
app.use('/guests', require('./routes/guests'));
app.use('/exchanges', require('./routes/exchanges'));

// Index route
// app.get('/', (req, res) => {
// res.send('Invalid Endpoint');
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
})