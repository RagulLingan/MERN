const User = require('../models/user');
const PasswordResetTokens = require('../models/passwordTokens');
const jwt = require('jsonwebtoken');//login token
require("dotenv").config();

// REGISTER controller
exports.register = async (req,res) => {
    // check if user already exist
    console.log(req.body)
    const userNameExists = await User.findOne({
        username : req.body.username
    });
    const emailExists = await User.findOne({
        email : req.body.email
    });
    if(userNameExists){
        return res.status(403).json({
            error: "Username is taken already!"
        })
    }
    if(emailExists){
        return res.status(403).json({
            error: "Email is taken already!"
        })
    }

    // if new user, create new user
    const reqBody = {
                ...req.body,
                ["isAdmin"]: req?.body?.isAdmin ? req.body.isAdmin : false,
            }
    const user = new User(reqBody);
    await user.save();

    res.status(201).json({
        message : 'Signup Successful! Please Login to proceed.!'
    })
}

// LOGIN controller
exports.login = async (req,res) =>{
    // find the user based on email
    const {email, password} = req.body;
    await User.findOne({email}).exec((err, user)=>{
        // if error or no user found
        if(err || !user){
            return res.status(401).json({
                error: 'Invalid credentials'
            })
        }

        // if user founds use the authenticate method from the modal
        if(!user.authenticate(password)){ // checking for password match
            return res.status(401).json({
                error: 'Invalid Eamil or Password!'
            })
        }


        // if credentials are correct -> generate a token with user id and jwt secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn : "24h",
        });

        // persist the token as 'jwt' in cookie with an expiry date
        res.cookie('jwt', token,{expire : new Date() + 9999, httpOnly:true});

        //return the response with user
        const {username} = user;
        return res.json({
            message:"Login Successful",
            username,
        })
    })
}

//logout
exports.logout = async (req,res) =>{
    //clear the cookie
    res.clearCookie('jwt')
    return res.json({
        message : "Logout Successful!"
    })
}


// getLoggedInUser
exports.getLoggedInUser = async (req,res) =>{
    const {username} = req.user
    return res.status(201).json({
        message:"User is still logged-in",
        username
    })
}



// usersList
exports.getUsersList = async (req,res) =>{
    console.log(req.userList)
    let userList = req.userList.map(i=>{
        const {username, email, _id}=i;
        const ele = {
            username:username,
            email:email,
            id : _id
        }
        return ele;
    })
    return res.status(201).json({
        message:"User is still logged-in",
        userList
    })
}



// Reset Password controller
exports.resetPassword = async (req,res) => {
    // check if user already exist
    console.log('^^^^^^^^^^^^^^^^^^^',req.body,req.tokenEmail)
    const {email, password} = req.body;
    const userNameExists = await User.findOne({"_id": req.userId})
    // User.findByIdAndUpdate(req.userId, req.body,
    //     function (req,res) {
    //         if (req){
    //             console.log(err)
    //         } else{
    //             console.log("Updated User : ", res);
    //         }
    // });
    // if new blog, create new blog
    console.table(req.body);
  
    res.status(201).json({
        message : 'Record updated Successfully!'
    })
    //User.deleteOne({value: req.tokenEmail})
    console.log('-----userNameExists----',userNameExists)
    res.status(201).json({
        message : 'reset is done.!'
    })
}