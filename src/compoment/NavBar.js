import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
      if(state){
        return[
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/create">Post</Link></li>,
          // <li><Link to="/myfollowingpost">My following Posts</Link></li>,
          <li>
            <button className="btn waves-effect waves-light red"
                    onClick={() => {
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/login')
                      }}>
                Logout
            </button>
          </li>
        ]
      }else{
        return [
          <li><Link to="/login">Login</Link></li>,
          <li><Link to="/register">Register</Link></li>
          
        ]
      }
    }
    return(
        <nav>
        <div className="nav-wrapper" style= {{classes: "blue"}}>
          <Link to={state?"/":"/login"} className="brand-logo left bold" style={{marginLeft:"15%"}}>Switzerland's Review</Link>
          <ul id="nav-mobile" className="right" style={{marginRight:"15%"}}>
            {renderList()}
          </ul>
        </div>
        </nav>
    )
}

export default Navbar