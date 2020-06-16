import React, {useState, useEffect} from 'react';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost = () => {
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [picture,setPicture] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
        if(url){
        fetch("/createnewsfeed",{
            method: "post",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res => res.json())
        .then( data => {
            if(data.error){
                M.toast({html: data.error, classes:"red"})
            }
            else{
                M.toast({html: "Haha ok post duoc roi", classes:"green"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
        }
    },[url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", picture)
        data.append("upload_preset", "dom-clone")
        data.append("cloud_name", "DOMedia")
        fetch("https://api.cloudinary.com/v1_1/domedia/image/upload/",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data => {
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="card input-filed" 
             style={{margin:"10px auto", 
                     maxWidth:"500px", 
                     padding:"20px", 
                     textAlign:"center"}}>
            <input type="text" 
                   placeholder="Title"
                   value={title}
                   onChange={(event) => setTitle(event.target.value)}
                   />
            <input type="text" 
                   placeholder="The URL"
                   value={body}
                   onChange={(event) => setBody(event.target.value)}
                   />
            <div className="file-field input-field">
                <div  className="btn grey">
                    <span>Photo</span>
                        <input type="file" onChange={(event) => setPicture(event.target.files[0])}
                        />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light grey"
            onClick={()=>postDetails()}>
                Post
            </button>
        </div>
    )
}

export default CreatePost;