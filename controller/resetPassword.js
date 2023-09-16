import ResetPassword from '../models/resetPassword.js';
import User from '../models/User.js'
import nodemailer from 'nodemailer';

export const emailSend = async (req, res)=>{
    console.log(req.body.email);
    let data = await User.findOne({email:  req.body.email})
    console.log(data);
    if(data){
        let otpcode = Math.floor((Math.random()*10000)+1);
        let otpdata = new ResetPassword({
            email:req.body.email,
            code: otpcode,
            expireIn: new Date().getTime() + 300* 1000
        })
        let otpResponse = await otpdata.save();
        mailer(otpcode, 'raut0660@gmail.com')
        res.status(200).json("Please Check your email id")
    }else{
       res.json("Invalid Email Id")
    }
    res.status(200).json("User Found")
}

export const changePassword = async (req, res)=>{
    let data = await ResetPassword.find({email: req.body.email, code: req.body.otpcode});
    const response = {}
    if(data){
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if(diff <0){
            res.status(500).json("Token Expire")
        }else{
            let user = await User.findOne({email: req.body.email})
            user.password = req.body.password;
            user.save();
            res.status(500).json("password Changed Successfully")
        }
    }else{
        res.status(404).json("Invalid OTP")
    }
    res.status(200).json("Success")
}

const mailer = (email, otp)=>{
    var transporter = nodemailer.createTransport({
        service: 'santoshiverma.2018@gmail.com',
        port: 5001,
        secure: false,
        auth: {
            user: 'santoshiverma.2018@gmail.com',
            pass: "santoshi@2000"
        }
    });

    var mailOptions = {
        from : 'santoshiverma.2018@gmail.com',
        to: 'raut0660@gmail.com',
        subject: "Sending Email using Node.js",
        text: "Thank u Ma'am !"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: " + info.response);
        }
    } )
}