import React,{useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
//import axois from 'axois'
import M from 'materialize-css'


const Register = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [url , setUrl] = useState(undefined)

    useEffect(() => {
        if(url){
            uploadField()
        }
    },[url])
    // make a api to upload photo into clound
    const uploadPhotoProfile = () => {
        const data = new FormData()
        data.append("file", image)
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

    const uploadField = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Enter correct email", classes:"red"})
            return
        }
        fetch("/register",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res => res.json())
        .then( data => {
            if(data.error){
                M.toast({html: data.error, classes:"red"})
            }
            else{
                M.toast({html: data.message, classes:"green"})
                history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const PostRegister = () => {
        if(image){
            uploadPhotoProfile()
        }else{
            uploadField()
        }
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //     M.toast({html:"Enter correct email", classes:"red"})
        //     return
        // }
        // fetch("/register",{
        //     method: "post",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body:JSON.stringify({
        //         name,
        //         password,
        //         email
        //     })
        // }).then(res => res.json())
        // .then( data => {
        //     if(data.error){
        //         M.toast({html: data.error, classes:"red"})
        //     }
        //     else{
        //         M.toast({html: data.message, classes:"green"})
        //         history.push('/login')
        //     }
        // }).catch(err => {
        //     console.log(err)
        // })
    }

    return(
        <div className="mycard">
          <div className="card auth-card">
            <h3>DOM</h3>
            <input type="text" 
                   placeholder="Name" 
                   value={name}
                   onChange={(event) => setName(event.target.value)}/>
            <input type="text" 
                   placeholder="Email" 
                   value={email}
                   onChange={(event) => setEmail(event.target.value)}/>
            <input type="password"
                   placeholder="Password" 
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <div className="file-field input-field">
                <div  className="btn grey">
                    <span>Your Photo Profile</span>
                        <input type="file" onChange={(event) => setImage(event.target.files[0])}
                        />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light grey"
                    onClick = {() => PostRegister()}>
                Register
            </button>
            <br/>
            <Link to="/login">
                <h10>
                    Already have an account ?
                </h10>
            </Link>
          </div>
        </div>
        
    )
}

export default Register;