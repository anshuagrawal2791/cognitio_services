/**
 * Created by anshu on 29/11/16.
 */
'use strict';

const school = require('../models/school.js');

exports.get = (req,res,callback)=>{

    school.find({zone: {$in : JSON.parse(req.body.zones)}},(err,schools)=>{
        // console.log(schools);
        // let result = [];

        callback(schools);
    });
};
exports.getById = (req,res,callback)=>{
  school.findOne({id:req.body.id},(err,school)=>{
      callback(school);
  })
};