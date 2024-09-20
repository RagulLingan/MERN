import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getBlogsList ,addBlog, updateBlog, deleteBlog } from "../api/blog";
import { UserContext } from "../UserContext";
import {toast} from 'react-toastify';
import DropZone from "./dropzone";
import { Link } from "react-router-dom";
const BlogsList = () => {
  const {user} = useContext(UserContext);
  const [blogList, setBlogList] = useState([]);
  const [files, setFiles] = useState([]);
  const [isUpdate, setisUpdate] = useState(false);
  const [Data,setData] = useState({
    id:"",
    title:"",
    description:"",
    tag:"",
  });
  const getAllBlogsAction = () =>{
    getBlogsList().then((res)=>{
        console.log(res)
          if(res?.blogList){
              setBlogList(res.blogList);
          }
      })
  }
  useEffect(()=>{
    getAllBlogsAction();
  },[])
  const resetFileds = () =>{  
    setisUpdate(false)
    setData({
      title:"",
      description:"",
      tag:"",
    })
  }
  const inputHandler = (e) =>{
    const {name,value} = e.target;
    setData({
      ...Data,
      [name] : value
    })
  }
  const submitHandler = (e) =>{
    e.preventDefault();
    addBlog(Data).then((res)=>{
      console.log(res)
      if(res.error) toast.warning(res.error);
      else{
        toast.success(res.message);
        getAllBlogsAction();
        resetFileds(); 
      }
    })
  }
  const onClickEdit = (i) =>{
    console.log(i);
    setData(i);
    setisUpdate(true)
  }
  const updateHandler = () =>{
    updateBlog(Data).then((res)=>{
      console.log(res)
      if(res.error) toast.warning(res.error);
      else{
        toast.success(res.message);
        getAllBlogsAction();
        resetFileds(); 
      }
    })
  }
  const deleteHandler = (id) =>{
    deleteBlog(id).then((res)=>{
      console.log(res)
      if(res.error) toast.warning(res.error);
      else{
        toast.success(res.message);
        getAllBlogsAction(); 
      }
    })
  }
  return (
    <div className="container">
      Welcome {user ?  `${user}'s` : ""} .!
      <div className="">
        <div className=" row">
            {blogList.map((i)=> <>
              <div className="col-3" key={i.id}>
                <div className="card p-3">
                    <img src={`data:image/png;base64,${i.imgSrc}`} width={'100%'} height={150} alt="" />
                    <hr />
                    <h4 className="m-0 listTitle">
                    <Link  to={`/blogs/${i.id}`}>
                        {i.title} <small>{i.tag}</small>
                    </Link>
                    </h4>
                    <p className="m-0 blog-desc">{i.description}</p>
                </div>
              </div>
            </>)}
        </div>
      </div>
    </div>
  );
}
export default BlogsList;