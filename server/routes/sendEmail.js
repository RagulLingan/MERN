const express = require('express');
const PasswordResetTokens = require('../models/passwordTokens');
const sendEmaill = require('../controllers/sendEmails/sendEmail');
const router = express.Router();
const jwt = require('jsonwebtoken');//login token

// Import controllers  (APIS)
const {verifyToken} = require('../middlewares/auth')
const {emailValidator, userByEmail} = require('../middlewares/validateEmailAddress')

// api routes

router.post("/sendemail",emailValidator, userByEmail, async (req, res) => {
  const { email } = req.body;
  console.log('email___________',req.user.email)
  // if credentials are correct -> generate a token with user id and jwt secret
  const token = jwt.sign({email: req.user.email}, process.env.JWT_SECRET, {
    expiresIn : "24h",
  });
  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = `Hi There, Ragul here!`;
    const message = `
        <h3>Hello ${req.user.username},</h3>
        <p>This is an auto generated mail, Please don't reply.! <br/><br/>
          To change password <a href="${process.env.CLIENT_APP_URL}#/resetPassword?resetKey=${token}" target="blank">click here!</a>
        </p>
        <p>Regards...</p>
    `;
    // const newtoken = new PasswordResetTokens({value:token});
    // const x = await newtoken.save();
    const a = await sendEmaill(subject, message, send_to, sent_from, reply_to);

    
    res.status(200).json({ success: true, message: `Email Sent`,vals:`${JSON.stringify(a)}` });
    console.log('8888888888res',res)
  } catch (error) {
    console.log('8888888888res-e',res);
    res.status(500).json(error.message);
  }
});
module.exports = router;