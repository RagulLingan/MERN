export const register = async (props)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/register`,{
            method:'POST',
            headers: {
                Accept : 'application/json',
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(props)
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot register at this time. ${e}`)
    }
}


export const login = async (props={})=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
            method:'POST',
            credentials:"include",
            headers: {
                Accept : 'application/json',
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(props)
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot login at this time. ${e}`)
    }
}

export const sendemail = async (props)=>{
    try{
        // const res = await fetch(`${process.env.REACT_APP_API_URL}/sendemail`,{
        //     method:'GET',
        //     credentials:"include",            
        // });
        const res = await fetch(`${process.env.REACT_APP_API_URL}/sendemail`,{
            method:'POST',
            headers: {
                Accept : 'application/json',
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify(props)
        });
        return await res.json();
    } catch(e){
        console.log(`Cannot logout at this time. ${e}`)
    }
}

export const resetPassword = async (props,token)=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/resetPassword`,{
            method:'POST',
            headers: {
                "Accept" : 'application/json',
                "Content-Type" : 'application/json',
                "Authorization": `${token}`
            },
            body: JSON.stringify(props)
        });
        return await res.json();
    } catch(e){
        console.log(`Cannot logout at this time. ${e}`)
    }
}

export const logout = async ()=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`,{
            method:'GET',
            credentials:"include",            
        });
        return await res.json();
    } catch(e){
        console.log(`Cannot logout at this time. ${e}`)
    }
}

export const getUser = async ()=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
            method:'GET',
            credentials:"include",            
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot get user at this time. ${e}`)
    }
}

export const getUsersList = async ()=>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/usersList`,{
            method:'GET',
            credentials:"include",            
        });
        return await res.json();
    } catch(e){
        throw new Error(`Cannot get user at this time. ${e}`)
    }
}