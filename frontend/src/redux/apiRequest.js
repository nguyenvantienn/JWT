import axios from "../axios";


import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess ,logOutStart , logOutSuccess , logOutFailed } from "./authSlice";
import { getUserFalse , getUserStart , getUserSuccess ,deleteUserFalse ,deleteUserStart ,deleteUserSuccess} from './userSlice'

export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res =await axios.post("/auth/login",user);
        console.log(res);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
}

export const registerUser = async(user,dispatch,navigate) =>{
    dispatch(registerStart());
    try {
        const res = await axios.post("/auth/register",user);
        dispatch(registerSuccess());
        navigate("/login");

    } catch (error) {
        dispatch(registerFailed());
    }
}

export const getAllUser = async(accessToken , dispatch , axiosJWT, ) =>{
    dispatch(getUserStart());
    try {
        //axiosJWT check han cua accessToken truoc khi goi api
        const allUser = await axiosJWT.get("/user",{
            //Them token vao header vao request
            headers :{token : `Bearer ${accessToken}`}
        });
        dispatch(getUserSuccess(allUser.data));
    } catch (error) {
        dispatch(getUserFalse())
    }
}

export const deleteUser = async(accessToken , dispatch , id , axiosJWT) =>{
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete("/user/"+id,{
            headers : {token:`Bearer ${accessToken}`},
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFalse(error.response.data));
    }
}


//LogOut 
export const logOut = async(dispatch , navigate , id , accessToken , axiosJWT) =>{
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/auth/logout", id ,{
            headers: { token : `Bearer ${accessToken}`}
        })
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(logOutFailed());
    }
}