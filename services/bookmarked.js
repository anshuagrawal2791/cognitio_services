'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose');
const user = require('../models/user');
const uniq = require('uniq');


exports.get= (req,res,callback)=>{

	user.findOne({id:req.body.id},(err,user)=>{
		if(err)
			console.log(err)
		else{
			callback(user.bookmarked);
		}
	});

}
exports.getQues = (req,res,callback)=>{
	user.findOne({id:req.body.id},(err,user)=>{
		if(err)
			console.log(err)
		else{
			ga.find({id:{ $in: user.bookmarked }},(err,questions)=>{
				if(err)
					console.log(err);
				else{
					callback(questions);
				}
			})
		}
	});
}
exports.remove = (req,res,callback)=>{
	user.findOne({id:req.body.id},(err,user)=>{
		let index = user.bookmarked.indexOf(req.body.question);
		if (index > -1) {
			user.bookmarked.splice(index, 1);
		}
		user.save((err)=>{
			if(err)
				console.log(err)
			else{
				callback({'res':true});
			}
		});
	});
}
exports.add = (req,res,callback)=>{
	user.findOne({id:req.body.id},(err,user)=>{
		let bookmarked = JSON.parse(req.body.bookmarked);
		let b = user.bookmarked.concat(bookmarked);
		user.bookmarked=uniq(b);

		user.save((err)=>{
			if(err)
				console.log(err);
			else
				callback({'res':true,"response":"Added Successfully"});
		});
	});
}