const mongoose= require("mongoose");


const courseSchema = mongoose.Schema({
    username:{
        type: String,
        required : [true, "This field is mandatory"],
        min: 3,
        max:25
    },
       email:{
        type: String,
        required : [true, "This field is mandatory"],
        unique: [true, "Email has been already taken"],
        max: 60,
        index:true, 
        sparse:true
    },
    phone:{
        type: Number,
        required : [true, "This field is mandatory"],
    },
    password:{
        type: String,
        required : [true, "This field is mandatory"]
    },
    cpassword:{
        type: String,
        required : [true, "This field is mandatory"]
    },
    userType:{
        type: String,
    },

    date: {
        type: Date,
    },
    
    
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]

},

{
    timestamps: true,
}

)



const User= mongoose.model('User', courseSchema)

module.exports = User