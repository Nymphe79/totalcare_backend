
const jwt = require('jsonwebtoken');
const Member = require('../model/members');

const admin = async(req,res,next)=>{

    try{

        const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'No Token ! .'});
    }

    const verifiedToken = jwt.verify(token,'Key');
    if(!verifiedToken){
        return res.status(401).json({msg:'UnAuthorized Access'});
    }

    const member = await Member.findById(verifiedToken.id);
    if(member.type == 'user' || member.type == 'seller'){
        return res.status(500).json({error:'You are not an admin'});
    }

    req.member = verifiedToken.id;
    req.token = token;

    next();



    }
    catch(e){
        res.status(500).json({error:e.message});
    }

    

};

module.exports = admin;