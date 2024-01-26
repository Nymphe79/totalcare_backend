
const jwt = require('jsonwebtoken');




const auth = async(req,res,next) =>{

    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token !Access Denied.'});
    }

    const verifyToken =  jwt.verify(token,'Key');
    if(!verifyToken){
        return res.status(401).json({msg:'Token Verification denied.Authorization failed.'});
    }


 

    
    req.member= verifyToken.id;
    req.token = token;



    next();


};


module.exports = auth;