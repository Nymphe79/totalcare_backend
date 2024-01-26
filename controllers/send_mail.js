const nodemailer = require('nodemailer');
 
const {EMAIL,PASSWORD} = require('../env');
const Member = require('../model/members');
const Appointment = require('../model/appoinment');



const sendingMail = async(req,res) =>{

    const mem = await Member.findById(req.member);
    const appoint = await Appointment.find({memberId:req.member});
    

    

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }

    });

    var mailOption = {
        from: 'ujjwol1079@gmail.com',
        to:mem.email,
        subject:'Sending email using node js',
        text: 'Hello just a test',
        body:[
            {
                appoint


            }
        ]
        
    };

  let info =  await transporter.sendMail(mailOption,function(error,info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email sent: '+ info.response);
        }

    });

    res.json(info);

};

module.exports = sendingMail;