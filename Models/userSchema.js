const mongoose = require('mongoose');
const validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min: [3, 'Must be atleast 3 letters']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email")
            }
        }
    },
    password:{
        type: String,
        required:true
    }
})

const users = mongoose.model("users", userSchema)
module.exports = users
