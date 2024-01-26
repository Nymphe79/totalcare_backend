const express = require('express');
const admin = require('../middleware/admin');
const adminRoute = express.Router();
const Services = require('../model/services');
const auth = require('../middleware/auth');


adminRoute.post('/admin/add_service',admin,async(req,res)=>{

    try{

        const {serviceName,image,price} = req.body;
    
    const existService = await Services.findOne({serviceName});
    if(existService){
        return res.status(400).json({msg:'Service name already exists'});
    }

    let services = new Services({
        serviceName,
        image,
        price

    });

    services = await services.save();

    res.json(services);

    }

    catch(e){
        res.status(500).json({error:e.message});
    }
    


});


adminRoute.get('/admin/getService',auth,async(req,res)=>{
    try{
        const services = await Services.find({});

        res.json(services);

    }
    catch(e){
        res.status(500).json({error:e.message});
    }

});


module.exports = adminRoute;