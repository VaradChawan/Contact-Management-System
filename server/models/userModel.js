const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    fullName:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone Number is required"]
    },

    password:{
        type:String,
        required:[true,"Password is required"]
    }

})


const userModel=mongoose.model('users',userSchema);
module.exports=userModel;