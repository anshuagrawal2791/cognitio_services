'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose'); 
const user = require('../models/user');

exports.get = (req,res,callback)=>{

	user.findOne({id:req.body.id},(err,user)=>{
		if(err)
			console.log(err);
		else{
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: req.body.category },{class: req.body.class} ] }).limit(15).exec((err,questions)=>{
				console.log(err);
				if(questions.length<15)
				{
					callback({'res':false,'response':"Questions Over!"})
				}
				else{

					callback({'res':true,'questions':questions});
					// ga2 = true;
					// count++;
					// questions_res.ga = questions;
					// final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
		}
	})


}