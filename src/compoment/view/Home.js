import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/newsfeed',{
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            console.log(result)
            setData(result.posts)
        })
    },[])

    // const likePost = (id) => {
    //     fetch('/like', {
    //         method: "put",
    //         headers:{
    //             "Content-Type":"application/json", 
    //             "Authorization": "" + localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId:id
    //         })
    //     }).then(res => res.json())
    //     .then(result => {
    //         //console.log(result)
    //         const newData = data.map(item => {
    //             if(item._id == result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // const unlikePost = (id) => {
    //     fetch('/unlike', {
    //         method: "put",
    //         headers:{
    //             "Content-Type":"application/json", 
    //             "Authorization": "" + localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId:id
    //         })
    //     }).then(res => res.json())
    //     .then(result => {
    //        // console.log(result)
    //         const newData = data.map(item => {
    //             if(item._id == result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const makeComment = (text, postId) =>{
        fetch('/comment', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newdata = data.filter(item => {
                return item._id !== result._id
            })
            setData(newdata)
        })
    }
    return(
        <div className="home">
            {
                data.map(item => {
                    return(
                        <div className="card home-card" key={item._id}>
                            <h6 style={{margin:"10px", fontWeight:"bold", fontSize:"20px"}}><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile/"}>
                                    {item.postedBy.name}
                                </Link> 
                                {item.postedBy._id == state._id && 
                                 <i className="material-icons" style={{float:"right"}}
                                    onClick={() => deletePost(item._id)}>
                                    delete
                                 </i>
                                }
                                
                            </h6>
                        <div className="card-image">
                            <img src={item.picture}/>
                        </div>
                        <div className="card-content">
                            {/* <i className="material-icons" style={{color:"red"}}>favorite</i> */}
                            {/* {item.likes.includes(state._id)
                               ? 
                               <i className="material-icons " style={{color:"red"}}
                                   onClick={()=>{unlikePost(item._id)}}>favorite</i>
                               : 
                               <i className="material-icons" style={{color:"red"}}
                                   onClick={()=>{likePost(item._id)}}>favorite_border</i>
                            }
                            <h6>{item.likes.length} likes</h6> */}
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record => {
                                    return(
                                    <h6 key={record._id}>
                                        <span style={{fontWeight:"bold"}}>
                                        {record.postedBy.name}
                                        </span><span>   </span>
                                        {record.text}
                                    </h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id)
                                //makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="comment"/>
                            </form>
                        </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;