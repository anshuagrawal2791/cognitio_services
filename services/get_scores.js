'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose'); 
const user = require('../models/user');

exports.get = (req,res,callback)=>{

	let task1=false,task2=false;


	let result_json1 = {};
	let result_json2 = {};
	let final = (task1,task2,result1,result2)=>{
		
		if(task1&&task2){
			callback({'avg_scores':result1,'user_score':result2});
		}
	}


	user.aggregate(
		[
		{
			$match: {
				class: parseInt(req.body.class)
			}
		},

		{
			$group:
			{
				_id:null,
				ga:{$avg:"$scores.ga"},
				vr:{$avg:"$scores.vr"},
				lr:{$avg:"$scores.lr"},
				qa:{$avg:"$scores.qa"},
				la:{$avg:"$scores.la"},
				sa:{$avg:"$scores.sa"},
				ge:{$avg:"$scores.ge"},
				m:{$avg:"$scores.m"}


			}
		}
		],(err,result)=>{
			if(err)
				console.log(err);
			else{
				task2=true;
				console.log(result);
				result_json1 = result;
				final(task1,task2,result_json1,result_json2);
			}
		}
		);
	user.findOne({id:req.body.id},(err,user)=>{
		if(err)
			console.log(err);
		else{
			task1=true;

			result_json2 = user.scores;
			final(task1,task2,result_json1,result_json2);
		}
		
	})

}