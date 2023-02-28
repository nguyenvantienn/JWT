import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'

import axios from 'axios';

import {createAxios} from '../../AxiosJwt'
import jwt_decode from 'jwt-decode';
import * as apis from '../../redux/apiRequest'
import {loginSuccess} from '../../redux/authSlice'

const HomePage = () => {
  //DUMMY DATA
  const [allUser , setAllUser] = useState();
  const currentUser = useSelector(state => state.auth.login?.currentUser);
  const userList = useSelector(state => state.user.user?.allUser);
  const msg = useSelector(state => state.user.msg);

  //tao axios intance
  let axiosJWT = createAxios(currentUser , dispatch , loginSuccess );

  const userData = [
    {
      username: "anhduy1202",
    },
    {
      username: "kelly1234",
    },
    {
      username: "danny5678",
    },
    {
      username: "kenny1122",
    },
    {
      username: "jack1234",
    },
    {
      username: "loi1202",
    },
    {
      username: "nhinhi2009",
    },
    {
      username: "kellynguyen1122",
    },
    
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(currentUser?.accessToken);
  //Refresh token
  // const refreshToken = async()=>{
  //   try {
  //     const res = await axios.post("/v1/auth/refresh",{
  //       //Them cookie
  //       withCredentials: true,        
  //     })
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }



  //Check accessToken het han hay ko => Neu het han => reFreshToken
  // axiosJWT.interceptors.request.use( async(config)=>{
  //   //Lay thoi gian hien tai
  //   let date = new Date();
  //   ///Giai ma accessToken
  //   const decodedToken = jwt_decode(currentUser?.accessToken);
  //   if(decodedToken.exp < date.getTime()/1000){
  //     //Neu thoi gian het han < tg hien tai => token het han
  //     //Refresh token => goi Api refresh token
  //     const data = await refreshToken();//AccessToken moi
  //     //Update currentUser bang cai AccessToken moi
  //     const refreshUser = {
  //       ...currentUser,
  //       accessToken : data.accessToken,
  //       // refreshToken : data.refreshToken,
  //     };
  //     dispatch(loginSuccess(refreshUser));
  //     //Tao header moi
  //     config.headers["token"] = `Bearer ${data.accessToken}`;
  //   }
  //   return config;
  // },
  // (err)=>{//TH loi
  //   return Promise.reject(err);
  // });

  useEffect(()=>{
    // const getAlluser = async() =>{
      if(!currentUser){
        navigate("/login");
      }
      if(currentUser?.accessToken){
        apis.getAllUser(currentUser?.accessToken , dispatch , axiosJWT);
        // currentUser?.accessToken && getAlluser()
      }
      // console.log(res);
    // }
  },[])
  // const user = useSelector(state=>state.auth);
  // console.log(user);
  const handleDelete = (userId)=>{
    apis.deleteUser(currentUser?.accessToken , dispatch , userId , axiosJWT);
  }

  

  return (
    

    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role is : ${currentUser?.admin?'ADMIN': 'USER'}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={()=>{handleDelete(user._id)}}> Delete </div>
            </div>
          );
        })}
      </div>
      <span>{msg?msg:''}</span>
    </main>
  );
};

export default HomePage;
