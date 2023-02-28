import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {loginSuccess} from '../../redux/authSlice'




  //Refresh token
const refreshToken = async()=>{
try {
    const res = await axios.post("/v1/auth/refresh",{
    //Them cookie
    withCredentials: true,        
    })
    return res.data;
} catch (error) {
    console.log(error);
}
}


export const createAxios = (currentUser , dispatch, stateSuccess) =>{
    let newInstance = axios.create();
    newInstance.interceptors.request.use( async(config)=>{
        //Lay thoi gian hien tai
        let date = new Date();
        ///Giai ma accessToken
        const decodedToken = jwt_decode(currentUser?.accessToken);
        if(decodedToken.exp < date.getTime()/1000){
            //Neu thoi gian het han < tg hien tai => token het han
            //Refresh token => goi Api refresh token
            const data = await refreshToken();//AccessToken moi
            //Update currentUser bang cai AccessToken moi
            const refreshUser = {
                ...currentUser,
                accessToken : data.accessToken,
                // refreshToken : data.refreshToken,
            };
            dispatch(stateSuccess(refreshUser));
            //Tao header moi
            config.headers["token"] = `Bearer ${data.accessToken}`;
        }
        return config;
        },
        (err)=>{//TH loi
            return Promise.reject(err);
    });
    return newInstance;
}




// axiosJWT.interceptors.request.use( async(config)=>{
//     //Lay thoi gian hien tai
//     let date = new Date();
//     ///Giai ma accessToken
//     const decodedToken = jwt_decode(currentUser?.accessToken);
//     if(decodedToken.exp < date.getTime()/1000){
//         //Neu thoi gian het han < tg hien tai => token het han
//         //Refresh token => goi Api refresh token
//         const data = await refreshToken();//AccessToken moi
//         //Update currentUser bang cai AccessToken moi
//         const refreshUser = {
//         ...currentUser,
//         accessToken : data.accessToken,
//         // refreshToken : data.refreshToken,
//         };
//         dispatch(loginSuccess(refreshUser));
//       //Tao header moi
//         config.headers["token"] = `Bearer ${data.accessToken}`;
//     }
//     return config;
//     },
//     (err)=>{//TH loi
//         return Promise.reject(err);
// });