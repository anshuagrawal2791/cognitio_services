'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose'); 
const user = require('../models/user');

exports.get = (req,res,callback)=>{


	user.findOne({id: req.body.id},(err,user)=>{
		if(err)
			console.log(err);
		else{
			let ga2=false;
			let ge=false;
			let la=false;
			let lr=false;
			let m=false;
			let qa=false;
			let sa=false;
			let vr=false;
			let count = 0;
			let questions_res = {};
			questions_res.ga=[];
			questions_res.ge=[];
			questions_res.la=[];
			questions_res.lr=[];
			questions_res.m=[];
			questions_res.qa=[];
			questions_res.sa=[];
			questions_res.vr=[];
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "ga" },{class: req.body.class} ] }).limit(7).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<7)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					ga2 = true;
					count++;
					questions_res.ga = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "lr" },{class: req.body.class} ] }).limit(5).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<5)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					lr = true;
					count++;
					questions_res.lr = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "vr" },{class: req.body.class} ] }).limit(5).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<5)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					vr = true;
					count++;
					questions_res.vr = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "qa" },{class: req.body.class} ] }).limit(5).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<5)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					qa = true;
					count++;
					questions_res.qa = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "la" },{class: req.body.class} ] }).limit(5).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<5)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					la = true;
					count++;
					questions_res.la = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "sa" },{class: req.body.class} ] }).limit(8).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<8)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					sa = true;
					count++;
					questions_res.sa = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "ge" },{class: req.body.class} ] }).limit(5).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<5)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					ge = true;
					count++;
					questions_res.ge = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});
			ga.find({ $and: [ { id: { $nin: user.questions_answered_correctly } }, { category: "m" },{class: req.body.class} ] }).limit(5).exec((err,questions)=>{
				console.log(err);
				// callback({'questions':questions,'len':questions.length});
				if(questions.length<5)
				{
					count++;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
				else{
					m = true;
					count++;
					questions_res.m = questions;
					final(ga2,ge,la,lr,m,qa,sa,vr,count,questions_res);
				}
			});

			let final = (ga2,ge,la,lr,m,qa,sa,vr,count)=>{
				console.log(count);
				if(count==8){
					if(ga2&&ge&&la&&lr&&m&&qa&&sa&&vr){
						callback({'res':true,'questions':questions_res});
					}
					else{
						callback({'res':false,'response':'Questions Over!'});
					}
				}
			}


		}
	});

}