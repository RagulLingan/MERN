const express = require('express');
const router = express.Router();



// Import controllers  (APIS)
const {verifyToken} = require('../middlewares/auth')
const { getBlogsList, addBlog, updateBlog, deleteBlog } = require('../controllers/blogs');

// Import middlewares
const {blogsList, addBlogValidator} = require('../middlewares/blogs');


// api routes
router.get('/blogs', verifyToken, blogsList, getBlogsList);
router.post('/blogs',addBlogValidator, addBlog);
router.patch('/blogs/:id',addBlogValidator, updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;