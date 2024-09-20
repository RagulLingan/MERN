const nodeMailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const OAuth2_client= new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const sendEmaill = async (subject, message, send_to, sent_from, reply_to) => {
    const accessToken = OAuth2_client.getAccessToken();
    let transporter = nodeMailer.createTransport({
        service:"gmail",
        auth: {
          type: "OAuth2",
          user:process.env.EMAIL_USER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken:accessToken
        },
    });
    const options = {
        from: `Blogger Admin <${sent_from}>`,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,// get_html_message(),//message
    };
    
    //SEND EMAIL ACTION
    transporter.sendMail(options,function(err,info){
        if(err){
            console.log('email******************err',err)
        }else{
            console.log('email******************info',info?.messageId)
        }
        transporter.close();
    })
 
}
module.exports = sendEmaill;