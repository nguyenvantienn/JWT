const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,//Bat buoc phai co du lieu
        minlength: 5,
        maxlength: 20,
        unique:true,//Tranh trung lap
    },
    email:{
        type: String,
        required: true,//Bat buoc phai co du lieu
        minlength: 10,
        maxlength: 50,
        unique:true,//Tranh trung lap
    },
    password: {
        type: String,
        required: true,//Bat buoc phai co du lieu
        minlength: 6,
    },
    admin: {
        type: Boolean,
        default:false,
    },
    //tiemStamps cho biet user duoc tao va update khi nao,
},{timestamps : true})

module.exports = mongoose.model("User" ,userSchema)