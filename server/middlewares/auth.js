const jwt = require('jsonwebtoken');//login token
const PasswordResetTokens = require('../models/passwordTokens');

exports.verifyToken = (req, res, next) =>{
    let accessToken = req.cookies.jwt;
    console.log('checking the token',accessToken)
    // if there is no token in the cookies, request is unauthorized
    if(!accessToken){
        return res.status(403).json({
            error: "Unauthorized request"
        })
    }
    let payload;
    try{
        // verify the token jwt.verify
        // throws an error if token was expired or has an invalid signature
        payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        req._id = payload._id;

        next();
    }catch(e){
        //return req unauthorized error
        return res.status(403).json({
            error: "Unauthorized request"
        })
    }
}

exports.verifyTokenWithEmail = async (req, res, next) =>{
    let accessToken = req.headers.authorization;
    console.log('checking the token',req,req.headers.authorization)
    if(!accessToken){
        return res.status(403).json({
            error: "Unauthorized request"
        })
    }
    let payload;
    try{
        payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.tokenEmail = accessToken;
        const userNameExists = await PasswordResetTokens.findOne({value: accessToken})
        //User.deleteOne({value: req.tokenEmail})
        if(!userNameExists){
            return res.status(403).json({
                error: "User not exist1"
            })  
        }
        req.userId = userNameExists._id;
        console.log('-----userNameExists----',userNameExists);
        PasswordResetTokens.deleteOne({value: req.tokenEmail})
        next();
    }catch(e){
        //return req unauthorized error
        return res.status(403).json({
            error: "User not exist"
        })
    }
}
