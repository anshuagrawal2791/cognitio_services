'use strict';

const express = require('express');
const connect = require('connect');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const multer  = require('multer');
const mongoose = require('mongoose');  
const configs = require('./config');


app.set('port',process.env.PORT ||3000);


app.use(express.static(__dirname + 'public'));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
	  limit: '50mb',
      extended: true
  }));
require('./routes.js')(app);  
//routes
// require()

app.listen(app.get('port'),()=>{
	mongoose.connect('mongodb://'+configs.username+':'+configs.password+configs.db_url);

	console.log("now running on port: "+app.get('port'));
});
