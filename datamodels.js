const mongoose = require('mongoose');

const devuser = new mongoose.Schema({
    profilepic:{
        type:String,
    },
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    about:{
        type: String,
    },
    skills:[{
        type: String,
    }],

})

module.exports = mongoose.model("devuser",devuser);