const User = require('../models/user');
exports.userRegisterValidator = (req,res,next)=>{
    // username is not null
    req.check("username","Username is required").notEmpty();

    // email is not null, valid, normalized
    req.check("email","Email is required").notEmpty();
    req.check("email","Invalid email").isEmail();


    // password is not null
    req.check("password","Password is required").notEmpty();
    req.check("password").isLength({min:6}).withMessage("Password must have at least 6 characters");
    req.check(
        "password", 
        "Password must contain at least one uppercase, one lowercase, one number and one special symbol"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$/,"i")
    

    //check for the errors
    const errors = req.validationErrors();
    // if error, show the first one as it happens
    if(errors){
        const firstError = errors.map((err)=>err.msg)[0];
        return res.status(400).json({
            error:firstError
        })
    }


    //proceed to next middleware
    next();
}

exports.userById = (req, res, next) =>{
    User.findById(req._id).exec((err,user)=>{
        if(err || !user){
            return res.status(404).json({
                error : "User not found",
            })
        };

        //add user object in req with all user info
        req.user = user;

        next();
    })
}

exports.userList = (req, res, next) =>{
    User.find().exec((err,user)=>{
        if(err || !user){
            return res.status(404).json({
                error : "User not found",
            })
        };

        //add user object in req with all user info
        req.userList = user;

        next();
    })
}
exports.passwordValidator = (req,res,next)=>{
    
    req.check("password","Password is required").notEmpty();
    req.check("password").isLength({min:6}).withMessage("Password must have at least 6 characters");
    req.check(
        "password", 
        "Password must contain at least one uppercase, one lowercase, one number and one special symbol"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$/,"i");
    //check for the errors
    const errors = req.validationErrors();
    // if error, show the first one as it happens
    if(errors){
        const firstError = errors.map((err)=>err.msg)[0];
        return res.status(400).json({
            error:firstError
        })
    }
    //proceed to next middleware
    next();
}