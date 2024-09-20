
import React ,{useContext, useState} from 'react';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { sendemail } from '../api/user';
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import { UserContext } from '../UserContext';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [showOtp,setShowOtp] = useState(false)
    const [Data,setData] = useState({
      email:"ragullingan@gmail.com",
    });
    const inputHandler = (e) =>{
      const {name,value} = e.target;
      setData({
        ...Data,
        [name] : value
      })
    }
    const submitHandler = (e) =>{
      e.preventDefault();
      sendemail(Data).then((res)=>{
        console.log(res)
        if(res.error) toast.warning(res.error);
        else{
          //setShowOtp(true);
          toast.success("Please check your email inbox for change password!");
          navigate('/')
        }
      })
    }
    return (
      <div class="container m-auto col-md-4 pt-5">
        <label htmlFor="" class="h2">
            Forgot Password
        </label>
        <TextField 
          fullWidth 
          label="email" 
          variant="outlined" 
          value={Data.email}
          name="email"
          onChange={(e)=>inputHandler(e)}
        />
        <br/><br/>
        <Box className='pt-3'>
          <Button onClick={submitHandler} className='w-100 p-3' variant="contained">
            Submit
          </Button>
        </Box>
      </div>
    );
  }
export default ForgotPassword //ResetPassword;