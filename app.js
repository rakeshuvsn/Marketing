/**
 * Created by rakeshuvsn on 1/6/18.
 */
'use strict';


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//connect to database
mongoose.connect(config.database,{useMongoClient: true } );

// on database connection
mongoose.connection.on('connected', () => {
  console.log('connected to data base'+ config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('error on data base'+ err);
});

const app = express();

const users = require('./routes/users');
const consultants = require('./routes/consultants');

const port = process.env.PORT || 8080;

app.use(cors());

//set static folder

app.use(express.static(path.join(__dirname, 'dist')));


// Body parser middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/consultants', consultants);

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.listen(port, () => {
  console.log('server started on port' + port);
});