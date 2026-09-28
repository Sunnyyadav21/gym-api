const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    },
    registrationNo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    joiningDate:{
        type:Date,
        required:true
    },
    monthlyFee:{
        type:Number,
        required:true,
        min:0
    },
    lastpaidDate:{
        type:Date,
        default:null
    },
    nextDueDate:{
        type:Date,
        default:null
    },
   status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
}
        
},
{
    timestamps:true
})

module.exports = mongoose.model("Clinet", clientSchema)