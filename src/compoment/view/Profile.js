import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
    const [mypic, setMypic] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mynewsfeed', {
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setMypic(result.mynewsfeed)
        })
    },[])
    return(
        <div style={{maxWidth:"700px", margin:"0px auto", color: "white"}}>
            <div style ={{
                display:"flex",
                justifyContent: "space-around",
                margin: "38px 0px"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src={state?state.pic:"loading"}/>
                </div>
                <div>
                    <h4>
                        {state?state.name:"loading"}
                    </h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%", marginLeft:"20px", color: "white"}}>
                        <h6>{mypic.length} post</h6>
                    </div>

                </div>
            </div>
            <div className="gallery">
                {
                    mypic.map(item => {
                        return(
                            <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        )
                    })
                }
                
                
            </div>
        </div>
    )
}

export default Profile;