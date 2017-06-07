'use strict';
const crypto = require('crypto'); 
const rand = require('csprng'); 
const mongoose = require('mongoose'); 
// var gravatar = require('gravatar'); 
const user = require('../models/user_manager.js');

exports.login = (req,res,callback)=>{  

	user.find({email: req.body.email},(err,users)=>{ 

		if(users.length != 0){  

			let temp = users[0].salt; 
			let hash_db = users[0].hashed_password; 
			// let id = users[0].token; 
			let newpass = temp + req.body.password; 
			let hashed_password = crypto.createHash('sha512').update(newpass).digest("hex"); 
			// let grav_url = gravatar.url(email, {s: '200', r: 'pg', d: '404'}); 
			// console.log("hash_db "+hash_db);
			// console.log("salt_db "+ temp);
			// console.log("hashed_password "+ hashed_password);
			if(hash_db == hashed_password|| req.body.fb==1){ 

				user.findOne({ email: req.body.email },(err,users)=>{ 
					callback({'response':"Login Success",'res':true,
						'email':users.email,
						// 'referralCode':users.referralCode,
						'id':users.id,
						// 'pin':users.pin,
						'name':users.name,
						// 'phone':users.phone,
						// 'class':users.class,
						// 'gender':users.gender,
						'city':users.city,
						'zones':users.zones,
						// 'school': users.school,
						// 'address_line1':users.address_line1,
						// 'address_line2':users.address_line2,
						// 'address':users.address,
						'imagesS3':users.imagesS3
						// 'questions_played':users.questions_played,
						// 'questions_answered_correctly':users.questions_answered_correctly,
						// 'questions_answered_wrongly':users.questions_answered_wrongly,
						// 'location':users.location
					}); 	
				}); 

			}
			else {  

				callback({'response':"Invalid Password",'res':false});  
			} 
		}
		else {  

			callback({'response':"User doesn't exist",'res':false});  
		} 
	}); 
}