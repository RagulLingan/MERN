import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getBlogsList ,addBlog, updateBlog, deleteBlog } from "../api/blog";
import { UserContext } from "../UserContext";
import {toast} from 'react-toastify';
import DropZone from "./dropzone";
import { Link, useParams } from "react-router-dom";
const BlogsDetails = () => {
  const param = useParams();
  const {user} = useContext(UserContext);
  const [blogList, setBlogList] = useState([]);
  const [otherblogList, setOtherBlogList] = useState([]);
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
              setBlogList(res.blogList.filter(x=>`${x.id}` === param.id));
              setOtherBlogList(res.blogList.filter(x=>`${x.id}` !== param.id))
          }
      })
  }
  useEffect(()=>{
    getAllBlogsAction();
  },[param.id])
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
    <div className="container pt-3">
      {/* Welcome {user ?  `${user}'s` : ""} .! */}
      <div className="">
        <div className=" row">
          <div className="col-8">
            {blogList.map((i)=> <>
              <div key={i.id}>
                <h5>{i.title}</h5>
                <div className=" p-1">
                    <img src={`data:image/png;base64,${i.imgSrc}`} width={'100%'} height={150} alt="" />
                    <hr />
                    <h4 className="m-0 listTitle">
                    <Link  to={`/blogs/${i.id}`}>
                        #<small>{i.tag}</small>
                    </Link>
                    </h4>
                    <p className="m-0 blog-desc">{i.description}</p>
                </div>
              </div>
            </>)}
          </div>
          <div className="col-4">

            <h5>Other Blogs</h5>
            {otherblogList.map((i)=>{
              return <div key={i.id}>
                <div className=" p-1">
                    <div className="row">
                      <div className="col-3">
                        <img src={`data:image/png;base64,${i.imgSrc}`} width={'100%'} height={60} alt="" />
                      </div>
                      <div className="col-9">
                        <p>{i.title}</p>
                        <Link  to={`/blogs/${i.id}`}>
                          #<small>{i.tag} view details</small>
                        </Link>
                      </div>
                    </div>
                    
                    <hr />
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogsDetails;