const Blogs = require('../models/blogs');

//get all blogs
exports.blogsList = (req, res, next) =>{
    Blogs.find().exec((err,blog)=>{
        if(err || !blog){
            return res.status(404).json({
                error : "blog not found",
            })
        };

        //add blog object in req with all blog info
        req.blogList = blog;

        next();
    })
}


// add new blog validation
exports.addBlogValidator = (req,res,next)=>{
    // title is not null
    req.check("title","title is required").notEmpty();

    // description is not null, valid, normalized
    req.check("description","description is required").notEmpty();

    // tag is not null
    req.check("tag","tag is required").notEmpty();
    

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