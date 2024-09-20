import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersList } from "../api/user";
import { UserContext } from "../UserContext";
import BannerImg from "../imgs/bannr.jpg"
import { Button } from "@mui/material";
const Home = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(()=>{
    getUsersList().then((res)=>{
      console.log(res)
    })
  },[])
  return (
    <div>
          <div className="bannerDiv">
            <img src={BannerImg} width={'100%'} height={250} alt="" />
            <h1>Bloggers Point</h1>
          </div>
          <div className="row justify-content-center m-0">
            <div className="pt-5 col-4 text-center">
                <p className="txt-justify">
                A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments.
                </p>
                <Button variant="outlined" onClick={()=>{navigate('/BlogsList')}}>Explore Now</Button>
            </div>
          </div>
    </div>
  );
}
export default Home;