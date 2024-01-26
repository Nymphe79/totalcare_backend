const express = require('express');
const Member = require('../model/members');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Appoinment = require('../model/appoinment');

const auth = require('../middleware/auth');
const sendingMail = require('../controllers/send_mail');
const { findByIdAndUpdate } = require('../model/members');



router.post('/api/signup',async(req,res)=>{

    try{
        const {name,email,mobile,password,image} = req.body;
        const memberExist = await Member.findOne({email});

        if(memberExist){
          return  res.status(400).json({msg:'Member with this email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,8);

        let members = new Member({
            name,
            email,
            mobile,
            password:hashedPassword,
            image
        });

        members = await members.save();

        res.json(members);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

    
});


router.post('/api/signin',async(req,res)=>{

    try{
        const {email,password} = req.body;

        const member = await Member.findOne({email});
        if(!member){
            return res.status(400).json({msg:'Member with this email do not match'});
        }

       const matchedPassword = await bcrypt.compare(password,member.password);
       if(!matchedPassword){
        return res.status(400).json({msg:'Password do not match!'});
       }

       const token = await jwt.sign({id:member._id},'Key');
       
       res.json({token,...member._doc});



    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});

router.post('/istokenValid',async(req,res)=>{

    try{
        const token = req.header('x-auth-token');

        if(!token) return res.json(false);
    
        const verifyToken =  jwt.verify(token,'Key');
        if(!verifyToken) return res.json(false);
    
        const member = await Member.findById(verifyToken.id);
        if(!member) return res.json(false);
    
        res.json(true);
    }

    catch(e){
        res.status(500).json({error:e.message});
    }
   

});

router.get('/get/memberData',auth,async(req,res)=>{

    const member = await Member.findById(req.member);

    res.json({...member._doc,token:req.token});



});

router.get('/fetch/staffData',auth,async(req,res)=>{

    try{

        const member = await Member.find({});
        
        res.json(member);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});




router.post('/make/appointment',auth,async(req,res)=>{
    try{
        const {title,date,description,time} = req.body;

        const mem = await Member.findById(req.member);

        let appointment = new Appoinment({
            title,
            memberId:req.member,
            date,
            name:mem.name,
            description,time
        })

        appointment = await appointment.save();

        res.json(appointment);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});


router.get('/get/appointment/me',auth,async(req,res)=>{
    try{
        let appointment = await Appoinment.find({memberId:req.member});

        res.json(appointment);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

   

});

router.get('/fetch/memeber/:id',auth,async(req,res)=>{
    try{
       
        
        let member = await Member.findById(req.member);

        res.json(member);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

   

});

router.patch('/edit/profile/:id',auth,async(req,res)=>{
    try{
       
       const {name,mobile,image} = req.body;
        
       

      let member = await Member.findByIdAndUpdate(req.member,{name,mobile,image});

        
        

        // save the updated member
     member =   await member.save();

        res.json(member);
        
    

    }

    catch(e){
        res.status(500).json({error:e.message});
    }
});


router.post('/send/mail',auth,sendingMail);


router.post('/delete/appoint',auth,async(req,res)=>{

    try{
        const {id} = req.body;
        let appoint = await Appoinment.findByIdAndDelete(id);
        res.json(appoint);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});










module.exports = router;