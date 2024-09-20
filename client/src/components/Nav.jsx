import { Link } from "react-router-dom";
import { logout } from '../api/user';
import {useNavigate} from "react-router-dom";
import {toast} from 'react-toastify';
import { useContext } from "react";
import { UserContext } from "../UserContext";
const Navbar = () => {
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserContext);
    //const {setUser} = useContext(UserContext);
    const logoutAction = (e) =>{
      e.preventDefault();
      logout().then((res)=>{
        console.log(res)
        if(res.error) toast.warning(res.error);
        else{
          toast.success(res.message);
          setUser(null)
          //redirect to login
          navigate('/login')
        }
      })
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/'>
          Bloggers Point
          {/* <img src="https://badugukadhae.com/badugukadhae/appsongs/Images/bk.png"  height={50}/> */}
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class='mr-auto'></div>
          <div>
            <ul class="navbar-nav ml-auto">
                {!user ? 
                <>
                <li class="nav-item mr-4">
                    <Link className="nav-link" to='/register'>Resister</Link>
                </li>
                {/* <li class="nav-item ml-4">
                      <Link className="nav-link" to='/BlogsList'>Blogs</Link>
                </li> */}
                <li class="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
                </>
                 : 
                 <>
                  <li class="nav-item ml-4">
                      <Link className="nav-link" to='/BlogsList'>Blogs</Link>
                  </li>
                  <li class="nav-item ml-4">
                      <Link className="nav-link" to='/Profile'>Profile</Link>
                  </li>
                  <li class="nav-item ml-4">
                      <span className="nav-link" style={{cursor:"pointer"}} onClick={logoutAction}>Logout</span>
                  </li>
                </>
                }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
export default Navbar;