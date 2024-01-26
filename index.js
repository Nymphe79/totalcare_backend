const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./route/user_route');

const staffRoute = require('./route/staff_route');
const adminRoute = require('./route/admin_route');

const PORT = process.env.PORT || 3000;

const mongodb = 'mongodb+srv://nymphe:Ujj615456Aenzy@cluster0.o4evsbo.mongodb.net/?retryWrites=true&w=majority';



//initialization
const app = express();


//middleware 
app.use(express.json());
app.use(userRoute);

app.use(staffRoute);
app.use(adminRoute);


// connecting db
mongoose.connect(mongodb).then(()=>{
    try{
        console.log('connected to the mongoose');
    }
    catch(e){
        console.log(e.message);
    }

});


// Creating an api
app.listen(PORT,'0.0.0.0',()=>{

    console.log(`Connected to the port ${PORT}`);

});