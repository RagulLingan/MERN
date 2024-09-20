import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material';
import { useState } from 'react';
import { register } from '../api/user';
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [Data,setData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowConfirmPassword = () => setConfirmShowPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
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
      if(Data.password !== Data.confirmPassword){
        toast.success(`Password deesn't matched`);
        return;
      }
      register(Data).then((res)=>{
        console.log(res)
        if(res.error) toast.warning(res.error);
        else{
          toast.success(res.message);
          //redirect to login
          navigate('/login')
        }
      })
    }
    return (
      <div class="container m-auto col-md-4 pt-5">
        <label htmlFor="" class="h2">
            SIGN UP
        </label>
        <TextField 
          fullWidth 
          label="Username" 
          variant="outlined" 
          value={Data.username}
          name="username"
          onChange={(e)=>inputHandler(e)}
        />
        <br/><br/>
        <TextField 
          fullWidth 
          label="Email" 
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
        <br/><br/>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={confirmShowPassword ? 'text' : 'password'}
            value={Data.confirmPassword}
            name="confirmPassword"
            onChange={(e)=>inputHandler(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box className='pt-3'>
          <Button onClick={submitHandler} className='w-100 p-3' variant="contained">Signup</Button>
        </Box>
      </div>
    );
  }
export default Register;