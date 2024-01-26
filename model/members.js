const mongodb = require('mongoose');
const memberSchema = mongodb.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(val)=>{
             const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

             return val.match(regex);
            },
            message:'Email is not valid'

             
        }

    },
    mobile:{
        type:Number,
        required:true,
        trim:true,
        // validate:{
        //     validator:(val) =>{
        //         const regex = /^\d+$/i;
        //         return val.match(regex);
        //     },
        //     message:'Please enter numbers only!'
        // }
    },
   password:{
    type:String,
        required:true,
        trim:true,
         validate:{
            validator:(val)=>{
                return val.length>6;
            },
            message:'Password must be at least 6 characters long!'
            
         }

   },
   address:{
    default:'',
    type:String,


   },
   image:{
    type:String,
    required:true,
   }
    

   ,
   type:{
    default:'user',
    type:String,

   }

});

const Member = mongodb.model('Member',memberSchema);

module.exports = Member;