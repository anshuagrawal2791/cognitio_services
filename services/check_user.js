'use strict';
const user = require('../models/user.js');

exports.check = (req,res,callback)=>{

	user.find({email:req.body.email},(err,users)=>{
		
		if(users.length!=0){
			callback({'res':false,'response':'User already exists'});
		}
		else{
			callback({'res':true,'response':"User doesn't exist"});
		}
		
	});

}