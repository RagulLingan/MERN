import React ,{useContext, useState} from 'react';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from '../api/user';
import {Link, useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import { UserContext } from '../UserContext';

const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [Data,setData] = useState({
      email:"",
      password:"",
    });
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const inputHandler = (e) =>{
      const {name,value} = e.target;
      setData({
        ...Data,
        [name] : value
      })
    }
    const submitHandler = (e) =>{
      e.preventDefault();
      login(Data).then((res)=>{
        console.log(res)
        if(res.error) toast.warning(res.error);
        else{
          toast.success(res.message);
          setUser(res.username)
          //redirect to login
          navigate('/')
        }
      })
    }
    return (
      <div class="container m-auto col-md-4 pt-5">
        <label htmlFor="" class="h2">
            Login
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
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={Data.password}
            name="password"
            onChange={(e)=>inputHandler(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        

        <Box className='pt-3'>
          <Button onClick={submitHandler} className='w-100 p-3' variant="contained" disabled={!Data.email || !Data.password}>Login</Button>
        </Box>
        
        <Link to={'/forget-password'}>forgot password?</Link>
      </div>
    );
  }
export default Login;