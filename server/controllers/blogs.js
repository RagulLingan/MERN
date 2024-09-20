const Blogs = require('../models/blogs');
// blogsList
exports.getBlogsList = async (req,res) =>{
    console.log(req.blogList)
    let blogList = req.blogList.map(i=>{
        const {title, description, tag, _id,imgSrc}=i;
        const ele = {
            title : title,
            description : description,
            tag : tag,
            id : _id,
            imgSrc : imgSrc
        }
        return ele;
    })
    return res.status(201).json({
        message:"User is still logged-in",
        blogList
    })
}


// ADD BLOG

exports.addBlog = async (req,res) => {
    // check if user already exist
    console.log(req.body)
    const titleExists = await Blogs.findOne({
        title : req.body.title
    });
    const tagExists = await Blogs.findOne({
        tag : req.body.tag
    });
    if(titleExists){
        return res.status(403).json({
            error: "Blog title is taken already!"
        })
    }
    if(tagExists){
        return res.status(403).json({
            error: "Blog tag is taken already!"
        })
    }

    // if new blog, create new blog
    console.table(req.body);
    const blog = new Blogs(req.body);
    await blog.save();

    res.status(201).json({
        message : 'New record added Successfully!'
    })
}

// update blog (PATCH method)
exports.updateBlog = async (req,res) => {
    // check if user already exist
    console.table(req.body)
    const idExists = await Blogs.findOne({
        id : req.body.id
    });
    
    if(!idExists){
        return res.status(403).json({
            error: "Blog ID is not valid!"
        })
    }
    console.log('======================================')
    var blog_id = req.body.id;
    Blogs.findByIdAndUpdate(blog_id, req.body,
        function (req,res) {
            if (req){
                console.log(err)
            } else{
                console.log("Updated User : ", res);
            }
    });
    // if new blog, create new blog
    console.table(req.body);
  
    res.status(201).json({
        message : 'Record updated Successfully!'
    })
}


// delete blog 
exports.deleteBlog = async (req,res) => {
    // check if user already exist
    const recordID = req.params.id;
    const idExists = await Blogs.findOne({
        id : recordID
    });
    
    if(!idExists){
        return res.status(403).json({
            error: "Blog ID is not valid!"
        })
    }
    
    const data = await Blogs.findByIdAndRemove(recordID);
    if (!data) {
        return res.status(403).json({
            error: "Blog ID is not valid!"
        })
    };
  
    res.status(201).json({
        message : 'Record updated Successfully!'
    })
}