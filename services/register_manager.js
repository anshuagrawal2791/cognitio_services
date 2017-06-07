'use strict';
const user = require('../models/user_manager');
const crypto = require('crypto'); 
const rand = require('csprng'); 
const mongoose = require('mongoose'); 
// const user = require('../models/usermodel.js');
const validator = require('validator');  
const config = require('../config.json');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


exports.register = (req,res,callback)=>{



	let temp =rand(160, 36); 
	let newpass = temp + req.body.password; 
	let hashed_password = crypto.createHash('sha512').update(newpass).digest("hex"); 

	let current_Date = new Date();			
	let newuser = new user({ 
		email: req.body.email,
		hashed_password: hashed_password,   
		salt :temp, 
		name: req.body.name,
		
		
		// address_line1: req.body.address_line1,
		// address_line2: req.body.address_line2,
		// address:req.body.address,
		// pin:req.body.pin,
		// location: [req.body.longitude,req.body.latitude],	
		created_by:req.body.email,
		created_at:current_Date,
		modified_by:req.body.email,
		modified_at:current_Date
		// class : req.body.class,
		// gender: req.body.gender,
		// school: req.body.school,
		// gcm_token: req.body.gcm_token
	});
	console.log(JSON.parse(req.body.zones));

	newuser.zones = (JSON.parse(req.body.zones));

	console.log(newuser.zones);
	// newuser.bookmarked=[];
	newuser.id = "MA"+'-'+req.body.email+'-'+shortid.generate();
	if(req.body.profile_pic){
		newuser.imagesS3.name.push(req.body.profile_pic);
		newuser.imagesS3.description.push(req.body.profile_pic_from);
	}
	// console.log(newuser);


	user.find({email: req.body.email},(err,users)=>{  

		let len = users.length;  
		console.log(err);
		if(len == 0){
			newuser.save(function(err) { 
				if(err)  
					console.log(err);
				else
					callback({'response':"Sucessfully Registered",'res':true,'id':newuser.id});  

			});

		}
		else{    
			callback({'response':"Email already Registered",'res':false});  
		}
	});	



}