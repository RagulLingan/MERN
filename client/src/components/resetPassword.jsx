import React ,{useContext, useEffect, useState} from 'react';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { resetPassword } from '../api/user';
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import { UserContext } from '../UserContext';

const ResetPassword = () => {
    const path = useLocation();
    const navigate = useNavigate();
    const [showOtp,setShowOtp] = useState(false)
    const [Data,setData] = useState({
      email:"",
      password:"",
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
      const token = new URLSearchParams(path.search).get('resetKey');
      resetPassword(Data,token).then((res)=>{
        console.log(res)
        if(res.error) toast.warning(res.error);
        else{
          //setShowOtp(true);
          toast.success("Please check your email inbox for change password!");
          navigate('/')
        }
      })
    }
    useEffect(()=>{
      const usrSlct = new URLSearchParams(path.search).get('resetKey');
      // setData({
      //   ...Data,
      //   "email": usrSlct
      // })
    },[])
    return (
      <div class="container m-auto col-md-4 pt-5">
        <label htmlFor="" class="h2">
            Forgot Password
        </label>
        <TextField 
          fullWidth 
          label="New Password" 
          variant="outlined" 
          value={Data.password}
          name="password"
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
export default ResetPassword;