const User = require('../models/user');
exports.emailValidator = (req,res,next)=>{    
    req.check("email","Email is required").notEmpty();
    req.check("email","Invalid email").isEmail();

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
exports.userByEmail = (req, res, next) =>{
    console.log('req.body.email',req.body.email)
    User.findOne({ key: 'email', value: req.body.email }).exec((err,user)=>{
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