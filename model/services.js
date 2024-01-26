const mongoose = require('mongoose');
const serviceSchema = mongoose.Schema({

    serviceName:{
        type:String,
        required:true,
    },
    
    price:{
        type:Number,
        required:true
    },
    image:[
        {
            type:String,
            required:true
        }
    ]

});

const Services = mongoose.model('Services',serviceSchema);

module.exports = Services;