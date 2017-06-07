'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose'); 
const user = require('../models/user');

exports.get = (req,res,callback)=>{

	user.aggregate(
		[
		{
			$match: {
				class: parseInt(req.body.class)
			}
		},

		{
			$sort: { "scores.total": -1 }
		},
		{
			$limit: 5
		}
		],(err,result)=>{
			if(err)
				console.log(err);
			else{
				callback({'result':result,'count':result.length});
			}
		});



	}