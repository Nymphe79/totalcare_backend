const mongoose = require('mongoose');
const  appointmentSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    memberId:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true

    },
    description:{
        type:String,
        default:''
    }
});

const Appoinment = mongoose.model('Appointment',appointmentSchema);

module.exports = Appoinment;