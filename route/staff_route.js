const express = require('express');
const Staff = require('../model/staff');
const auth = require('../middleware/auth');

const staffRoute = express.Router();




staffRoute.post('/staff/signup',async(req,res)=>{

    try{
        const {name,email,profession,mobile,image} = req.body;

        const existEmail = await Staff.findOne({email});
        if(existEmail){
            return res.status(400).json({msg:'Staff with email already exists!'});
        }


        let staff = new Staff({
            name,
            email,
        
            profession,
            mobile,
            image,
        
        });

        staff = await staff.save();

        res.json(staff);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});



staffRoute.get('/staff/data',auth,async(req,res)=>{

    try{

        const staff = await Staff.find({});

        res.json(staff);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});

module.exports = staffRoute;
