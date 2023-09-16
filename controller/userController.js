const User = require("../models/User.js") ;
const Token = require("../models/tokenmodel.js") ;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHanlder = require('express-async-handler');

const registerUser = async (req, res) => {


  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashPassword,
      cpassword: hashPassword,
      userType: req.body.userType,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json(error);
  }
};

const loginUser = asyncHanlder(async (req, res) => {
  // console.log(req.body.email);
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (!user) {
      // return res.status(400).json("user not found");
      res.status(404);
      throw new Error('user not found')
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if(validPassword){
      const accessToken = jwt.sign({
        user: {
          userName: user.username,
          id : user._id,
          email : user.email,
        }
      },
         process.env.SECRET_KEY ,
         {expiresIn: "15m"}
      )
      res.status(200).json({
        accessToken,
        userName: user.username,
        userType: user.userType,
        id : user._id,
        email : user.email,
        phone : user.phone,
      })
    }else{
      res.status(401).json("Email or password is not valid")
    }
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-auth-token': token

    // const result = async ()=>{


      // if (validPassword) {
      //   // getting Token of User
      //   let tokenObj = await getTokenOfUserService(user._id);
  
      //   if (tokenObj == null || new Date().getTime() > tokenObj.expiresAt) {
      //      await generateTokenService(user._id);
      //     // getting Token of User
      //     tokenObj = await getTokenOfUserService(user._id);
      //   }
  
      //   res.json( {
      //     status: "ok",
      //     token: tokenObj.token,
      //     expiresAt: tokenObj.expiresAt,
      //     userName: user.username,
      //     userType: user.userType,
      //     _id : user._id,
      //     email : user.email,
      //     phone : user.phone,
      //     createdAt: user.createdAt,


      //   });
      // }
      // else{
      //   res.status(400).json("Username or Password incorrect!!")
      // }


  }
   catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

//#region Generate JWT Token
const generateTokenService = async (userId) => {
  try {
    //generate new token
    let jwtSecretKey = process.env.SECRET_KEY;

    let generatedTime = new Date().getTime();
    let tokenExpiryTime = generatedTime + 24 * 60 * 60 * 1000; // Token Expires In 1 Day

    let data = {
      userId: userId,
      tokenExpiryTime: tokenExpiryTime,
    };

    const token = jwt.sign(data, jwtSecretKey);

    // Deleting Previous Token
    await Token.findOneAndDelete({ userId: userId });

    // Creating Token Object To Store In DB
    let tokenObject = {
      userId: userId,
      token: token,
      expiresAt: tokenExpiryTime,
    };

    let tokenData = await Token.create(tokenObject);
    await tokenData.save();

    // Resolve Promise
    return Promise.resolve();
  } catch (error) {
    res.status(400).json("error");
  }
};
//#endregion
//#region Get Token Of User
const getTokenOfUserService = async (userId) => {
  try {
    //#region Token Pipeline
    let tokenPipeline = [
      {
        $match: {
          userId: userId,
        },
      },
    ];

    //#endregion

    let res = await Token.aggregate(tokenPipeline);

    if (res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  } catch (error) {
    res.status(400).json("error");
  }
};

// const currentUser = (req, res) => {
//   try {
//     res.status(200).json(req.user);
//   } catch (error) {
//     res.status(500).json("wrong token");
//   }
// };

const getUsers = async (req, res) => {
  try {
    const courses = await User.find({ });
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAdminUser = async (req, res) => {
  try {
    console.log(req.user.email);
    const ueseremail = req.user.email;
    const courses = await User.findOne({ ueseremail });
    console.log(courses.userType);
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json(error);
  }
};


const getAdminType = async (req, res, ) =>{
  try {
    const user = User.findOne({_id: req.params.id})
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getAdminUser,
  getAdminType,
}
