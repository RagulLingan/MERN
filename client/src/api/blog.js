export const getBlogsList = async ()=>{//usersList
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/blogsManagement/blogs`,{
            method:'GET',
            credentials:"include",            
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot get user at this time. ${e}`)
    }
}

export const addBlog = async (props)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/blogsManagement/blogs`,{
            method:'POST',
            headers: {
                Accept : 'application/json',
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(props)
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot add blog at this time. ${e}`)
    }
}
export const updateBlog = async (props)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/blogsManagement/blogs/${props.id}`,{
            method:'PATCH',
            headers: {
                Accept : 'application/json',
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(props)
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot add blog at this time. ${e}`)
    }
}



//delete blog

export const deleteBlog = async (id)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/blogsManagement/blogs/${id}`,{
            method:'DELETE',
            credentials:"include",
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot add blog at this time. ${e}`)
    }
}