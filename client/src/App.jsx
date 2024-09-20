import '../src/App.css'
import { useEffect, useState } from "react";
import { getTest } from "./functions/test";
import {Routes, Route, Outlet} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './UserContext';
//pages
import Home from "./components/Home";
import Navbar from "./components/Nav";
import Login from './components/Login';
import Register from './components/Register';
import { getUser } from './api/user';
import Blogs from './components/Blogs';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import DataTable from './components/AddSong';
import BlogsList from './components/BlogList';
import Profile from './components/Profile';
import BlogsDetails from './components/BlogDetails';


const App = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  
  //const [data, setData] = useState("Learn MERN");
  useEffect(()=>{
    getUser().then((res)=>{
      if(res.error) return;
      else{
        setUser(res.username)
        setUserInfo(res)
      }
    })
    // getTest()
    // .then((res)=>{
    //   setData(res.message)
    // })
    // .catch(e=>console.log(e));
  },[])
  return (
    <div>
      <UserContext.Provider value={{user,setUser}}>
      <Navbar />
      <Routes>
        <Route path='/DataTable' element={<DataTable/>} />
          {user ? 
            <>
              <Route path='/blogs' element={<Blogs/>} />
              <Route path='/Profile' element={<Profile/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/blogs/:id' element={<BlogsDetails />} />
              <Route path='/BlogsList' element={<BlogsList />} />
              <Route path='/*' element={<Home/>} />
            </>
            : 
            <>
              <Route path='/forget-password' element={<ForgotPassword/>} />
              {/* <Route path='/BlogsList' element={<BlogsList />} /> */}
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/resetPassword' element={<ResetPassword />} />
              <Route path='/*' element={<Login/>} />
            </>
          }
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
