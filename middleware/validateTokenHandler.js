
const  asyncHandler = require("express-async-handler") 
const jwt =  require("jsonwebtoken") 

const validateToken = async(req, res, next)=>{
    let token ;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        // const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                res.status(401).json(err )
            }

            req.user = decoded.user;
            next();
            // console.log(decoded);
        });

        if(!token){
            res.status(401).json("User is not authorized or token is missing in the request")
        }
    }
}

module.exports = validateToken;


