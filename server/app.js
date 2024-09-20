// Import Modules
const express = require('express');
const {json, urlencoded} = express;
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const sendEmaill = require('./controllers/sendEmails/sendEmail')
// App
const app = express();


// db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology : true,
})
.then(()=>console.log('DB Connected'))
.catch(err => console.log('DB CONNECTION ERROR',err))


// middleware
app.use(morgan("dev"));
app.use(cors({origin:true, credentials:true}));
app.use(json());
app.use(urlencoded({limit: '200mb', extended: true}));
app.use(cookieParser());
app.use(expressValidator());


// routes

const testRoutes = require('./routes/test')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blogs')
const emailRoutes = require('./routes/sendEmail')
app.use('/',testRoutes)
app.use('/',userRoutes)
app.use('/blogsManagement/',blogRoutes)
app.use('/',emailRoutes)//send email

//port
const port = process.env.PORT || 8080;


// listener
const server = app.listen(port, ()=>console.log(`Server is running on port ${port}`))