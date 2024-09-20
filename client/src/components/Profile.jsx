import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersList } from "../api/user";
import { UserContext } from "../UserContext";
import profileImg from "../imgs/profile.webp"
import { Button } from "@mui/material";
const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const {user} = useContext(UserContext);
  useEffect(()=>{
    console.log('userInfo',userInfo)
  },[userInfo]);
  useEffect(()=>{
    getUsersList().then((res)=>{
      setUserInfo(res.userList.filter(x=>x.username===user)[0])
    })
  },[]);
  const navigate = useNavigate();
  return (
    <div>
       <div className="container">
            <div className="row pt-4">
                <div className="col-3">
                    <img src={profileImg}  width={'100%'} />
                </div>
                <div>
                    <h5>
                        Name: <b>{userInfo?.username}</b>
                    </h5>
                    <p>
                        Email: <b>{userInfo?.email}</b>
                    </p>
                    {/* <Link  to={`/blogs`}>My Blogs</Link> */}
                    <Button onClick={()=>{navigate('/blogs')}} variant="outlined">My Blogs</Button>
                </div>

            </div>
       </div>
    </div>
  );
}
export default Profile;