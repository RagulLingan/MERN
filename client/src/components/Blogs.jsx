import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getBlogsList ,addBlog, updateBlog, deleteBlog } from "../api/blog";
import { UserContext } from "../UserContext";
import {toast} from 'react-toastify';
import DropZone from "./dropzone";
const Blogs = () => {
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
      imgSrc:""
    })
    setFiles([])
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
  useEffect(()=>{
    console.log('files', files)
    if(files.length > 0 ){
      handleFileSelect();
    }else{
      setData({
        ...Data,
        imgSrc: ""
      })
      //imgSrc
    }
  },[files])
  const handleFileSelect = (evt)=> {
    var f = files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        //showing file converted to base64
        console.log('base64String;', base64String);
        setData({
          ...Data,
          imgSrc: base64String
        })
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
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
      {/* Welcome {user ?  `${user}'s` : ""} .! */}
      <div className="row pt-3 align-items-start">
        <div className="col-8 row">
          <h5 className="pb-3 pt-2">My Blogs</h5>
            {blogList.map((i)=> <>
              <div className="col-12" key={i.id}>
                <div className="card p-3">
                    <div className="row align-items-start">
                      <img src={`data:image/png;base64,${i.imgSrc}`} height={60} width={60} alt="" />
                      <div className="pl-2">
                        <h4 className="m-0">
                          {i.title} <br />
                          <small className="tagTxt">#{i.tag}</small>
                        </h4>
                      </div>
                    </div>
                    <p className="m-0">{i.description}</p>
                    <hr />
                    <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4">
                      <div className="d-flex pt-3">
                        <button className="btn col px-0" onClick={()=>{onClickEdit(i)}} >Edit</button> &nbsp;
                        <button className="btn col px-0 btn-danger" onClick={()=>{deleteHandler(i.id)}} >Delete</button>
                      </div>
                    </div>
                    </div>
                </div>
              </div>
            </>)}
        </div>
        <div className="col-4">
            <p>
            {isUpdate ? "Update Blog" : "Add New Blog"}
            </p>
            <hr />
            <DropZone selectedFiles={setFiles} buttonText={"Select files"} />
            <br/>
            <TextField 
                fullWidth 
                label="Title" 
                className="mb-4"
                variant="outlined" 
                value={Data.title}
                name="title"
                onChange={(e)=>inputHandler(e)}
            />
            <TextField 
                fullWidth 
                label="description" 
                className="mb-4"
                variant="outlined" 
                value={Data.description}
                name="description"
                onChange={(e)=>inputHandler(e)}
            />
            <TextField 
                fullWidth 
                label="Tag" 
                variant="outlined" 
                value={Data.tag}
                name="tag"
                onChange={(e)=>inputHandler(e)}
            />
            <Box className='pt-3'>
                <Button onClick={isUpdate ? updateHandler : submitHandler} className='w-100 p-3' variant="contained" disabled={!Data.title || !Data.tag}>
                  {isUpdate ? "Update Blog" : "Add New Blog"}
                </Button>
                <p className="pt-3">
                  <span className="text-primary nav-link" onClick={resetFileds}>Clear Fields</span>
                </p>
            </Box>
        </div>
      </div>
    </div>
  );
}
export default Blogs;