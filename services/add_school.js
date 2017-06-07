/**
 * Created by anshu on 27/11/16.
 */
'use strict';
const school = require('../models/school');

const mongoose = require('mongoose');
// const user = require('../models/usermodel.js');

const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


exports.add = (req,res,callback)=>{


    let current_Date = new Date();
    let newschool = new school({
        email: req.body.email,
        cr:req.body.id,
        zone:req.body.zone,
        name:req.body.name,
        phone:req.body.phone,
        cr_name:req.body.cr_name,
        cr_phone:req.body.cr_phone,
        address:req.body.address,
        city:req.body.city,
        person_met:req.body.person_met,
        designation:req.body.designation,
        comments:req.body.comments,
        visit:req.body.visit,
        status:req.body.status,
        created_by:req.body.id,
        created_at:current_Date,
        modified_by:req.body.id,
        modified_at:current_Date


    });

    newschool.id = "SC"+'-'+req.body.id+"-"+shortid.generate();

    console.log(newschool);


            newschool.save(function(err) {
                if(err)
                {
                    console.log(err);
                    callback({'response':"Failed",'res':false,'id':newschool.id});
                }

                else
                    callback({'response':"Sucessfully Registered",'res':true,'id':newschool.id});

            });




}