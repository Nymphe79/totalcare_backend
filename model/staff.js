const mongoose = require('mongoose');
const staffSchema= mongoose.Schema({

    name:{
        required:true,
        type:String,

    },

    email:{
        required:true,
        type:String,
        validate:{
            validator:(val) =>{
        const regex =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    return val.match(regex);
            },

            message:'Email is not valid.'
        },

    },
    
    image:[{
        type:String,
        required:true
    }
],

   

    
    profession:{
        required:true,
        type:String,

    },
    
   
    mobile:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        default:'staff'
    }


   

});

const Staff = mongoose.model('Staff',staffSchema);

module.exports = Staff;

