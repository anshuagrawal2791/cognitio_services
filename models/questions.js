'use strict';
const mongoose = require('mongoose');  
const configs = require('../config.json');
const rand = require('csprng');

const Schema = mongoose.Schema;

let gaSchema = mongoose.Schema({
	 id : String,        
     class: Number,
     question: String,
     option_a: String,
     option_b: String,
     option_c: String,
     option_d: String,
     answer: String,
     category:String,
     created_by:String,
     created_at:Date,
     modified_by:String,
     modified_at:Date
     
});  

gaSchema.pre('save',function(next){
	let currentDate = new Date();
	this.modified_at = currentDate;
	next();
});


module.exports= mongoose.model('question',gaSchema);
