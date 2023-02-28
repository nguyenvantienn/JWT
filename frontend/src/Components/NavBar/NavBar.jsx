import { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";

import {logOutSuccess} from '../../redux/authSlice';
import {createAxios} from '../../AxiosJwt'
import * as apis from '../../redux/apiRequest'
import "./navbar.css";
const NavBar = () => {
  // const [user,setUSer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  {currentUser}= useSelector(state => state.auth.login);
  let AxiosJWT = createAxios(currentUser , dispatch , logOutSuccess);
  const handleLogOut =(id) =>{
    apis.logOut(dispatch ,navigate , id , currentUser?.accessToken)
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {currentUser? (
        <>
        <p className="navbar-user">Hi, <span> {currentUser.username}  </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={()=>{handleLogOut(currentUser?._id)}}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
