const express = require('express');
const router = express.Router();



// Import controllers 
const {getTest} = require('../controllers/test')


// Import middlewares


// api routes
router.get('/test',getTest)


module.exports = router;