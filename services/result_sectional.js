'use strict';
const ga = require('../models/questions');
const mongoose = require('mongoose'); 
const user = require('../models/user');
const uniq = require('uniq');

exports.get = (req,res,callback)=>{

	let task1=false,task2=false;


	let result_json = {};
	let final = (task1,task2,result)=>{
		
		if(task1&&task2){
			callback(result);
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
   			result_json = result;
   			final(task1,task2,result_json);
   		}
   }
);
	user.findOne({id:req.body.id},(err,user)=>{
		if(err)
			console.log(err)
		else{
			let played = JSON.parse(req.body.questions_played);
			let correct = JSON.parse(req.body.answered_correctly);
			let wrong = JSON.parse(req.body.answered_wrongly);
			let bookmarked = JSON.parse(req.body.bookmarked);

			// console.log(req.body);

			// let bookmarked2 = user.bookmarked;
			// console.log(bookmarked2);


			let b = user.bookmarked.concat(bookmarked);
			let p = user.questions_played.concat(played);
			let c = user.questions_answered_correctly.concat(correct);
			let w = user.questions_answered_wrongly.concat(wrong);

			Array.prototype.remove= function(){
				var what, L= arguments.length, ax;
				while(L && this.length){
					what= arguments[--L];
					while((ax= this.indexOf(what))!= -1){
						this.splice(ax, 1);
					}
				}
				return this;
			}
			user.bookmarked=uniq(b);
			user.questions_played=uniq(p);
			user.questions_answered_correctly=uniq(c);
			user.questions_answered_wrongly=uniq(w);
			user.questions_answered_wrongly.remove.apply(user.questions_answered_wrongly,c);

			let a1 = parseFloat(user.scores.ga);
			let a2 = parseFloat(user.scores.vr);
			let a3 = parseFloat(user.scores.lr);
			let a4 = parseFloat(user.scores.qa);
			let a5 = parseFloat(user.scores.la);
			let a6 = parseFloat(user.scores.sa);
			let a7 = parseFloat(user.scores.ge);
			let a8 = parseFloat(user.scores.m);
			let plays = parseFloat(user.scores.plays);

			user.scores.ga=((a1*plays) + parseFloat(req.body.ga))/(plays+1);
			user.scores.vr=((a2*plays) + parseFloat(req.body.vr))/(plays+1);
			user.scores.lr=((a3*plays) + parseFloat(req.body.lr))/(plays+1);
			user.scores.qa=((a4*plays) + parseFloat(req.body.qa))/(plays+1);
			user.scores.la=((a5*plays) + parseFloat(req.body.la))/(plays+1);
			user.scores.sa=((a6*plays) + parseFloat(req.body.sa))/(plays+1);
			user.scores.ge=((a7*plays) + parseFloat(req.body.ge))/(plays+1);
			user.scores.m=((a8*plays) + parseFloat(req.body.m))/(plays+1);
			user.scores.plays +=1;
			// console.log(user);
			user.save((err)=>{
				if(err)
					console.log("---"+err);
				else{
					task1=true;
					// console.log("---"+user);
					final(task1,task2,result_json);
				}
			});
			// b.remove.apply(b,user.bookmarked);

			// callback(uniq(b));
		}
	})
}