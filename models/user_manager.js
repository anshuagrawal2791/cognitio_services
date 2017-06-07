'use strict';
const mongoose = require('mongoose');  
const configs = require('../config.json');
const rand = require('csprng');

const Schema = mongoose.Schema;
var referralCode = rand(24,24);

let userSchema = mongoose.Schema({
    id : String,        
     email: String,  
     hashed_password: String,
     // gcm_token: String,    
     salt : String,  
     name:String,
     // phone:String,
     // city:String,
     temp_str:String ,
     zones:[String],
    //  address_line1:String,
    //  address_line2:String,
    //  address_line3:String,
    //  school:String,
    //  class:Number,
    //  gender:String,
     imagesS3 : {
        name: {type:[String]},
        description: {type:[String]}

    },
    // scores:{
    //     ga:{type:Number,default:0},
    //     vr:{type:Number,default:0},
    //     lr:{type:Number,default:0},
    //     qa:{type:Number,default:0},
    //     la:{type:Number,default:0},
    //     sa:{type:Number,default:0},
    //     ge:{type:Number,default:0},
    //     m:{type:Number,default:0},
    //     total:{type:Number,default:0},
    //     plays: {type:Number,default:0}
    // },
    // bookmarked:{type:[String]},
    // questions_played:{type:[String]},
    // questions_answered_correctly : {type:[String]},
    // questions_answered_wrongly: {type:[String]},
    //  address:String,
    //  pin:Number,
    //  location: {type:[Number],index : '2d'},
     created_by:String,
     created_at:Date,
     modified_by:String,
     modified_at:Date,
     last_login:Date,
     referralCode:{type:String,default:referralCode.toUpperCase()}

});  

userSchema.pre('save',function(next){
    let currentDate = new Date();
    this.modified_at = currentDate;
    next();
});


module.exports= mongoose.model('Users_Manager',userSchema);
