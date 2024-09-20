const express = require('express');
const router = express.Router();



// Import controllers  (APIS)
const {register, login, logout, getLoggedInUser, getUsersList,resetPassword} = require('../controllers/user')
const {verifyToken, verifyTokenWithEmail} = require('../middlewares/auth')

// Import middlewares
const {userRegisterValidator, userById, userList,passwordValidator} = require('../middlewares/user')

// api routes
router.post('/resetPassword',passwordValidator,verifyTokenWithEmail, resetPassword)
router.post('/register',userRegisterValidator, register)
router.post('/login', login)
router.get('/logout', logout)

router.get('/user', verifyToken, userById, getLoggedInUser)
router.get('/usersList', verifyToken, userList, getUsersList)


module.exports = router;