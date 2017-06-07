'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose'); 
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

exports.upload = (req,res,callback)=>{

	let questions = JSON.parse(req.body.questions);
	let a = req.body.category;
	if(a!='ga'&&a!='ge'&&a!='la'&&a!='lr'&&a!='m'&&a!='pp'&&a!='qa'&&a!='sa'&&a!='vr')
		callback({'res':false,'response':'invalid category'});
	else{
		for(let i =0;i<questions.length;i++){
		let newquestion = new ga({
			class: questions[i].class,
     		question: questions[i].question,
     		option_a: questions[i].option_a,
     		option_b: questions[i].option_b,
     		option_c: questions[i].option_c,
     		option_d: questions[i].option_d,
     		answer: questions[i].answer,
     		category: req.body.category,  //ga,ge,la,lr,m,pp,qa,sa,vr
     		id : shortid.generate()
		});
		if(i!=questions.length-1)
			newquestion.save();
		else{
			newquestion.save((err)=>{
				if(err)
					console.log(err);
				else
					callback({'res':true});
			})
		}

	}
	}
	
	// callback(questions);
}