
import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            allUser : null,
            isFetching :false,
            error: false
        },
        msg :'',
        reducers:{

            //Get User
            getUserStart : (state) =>{
                state.user.isFetching = true;
            },
            getUserSuccess : (state , action) =>{
                state.user.isFetching = false;
                state.user.allUser = action.payload;
            },
            getUserFalse : (state) =>{
                state.user.isFetching = false;
                state.user.error = true;
            },
            //Delete User
            deleteUserStart : (state) => {
                state.user.isFetching = true;
            },
            deleteUserSuccess : (state,action) => {
                state.user.isFetching =false;
                state.msg = action.payload;
            },
            deleteUserFalse : (state,action) => {
                state.user.isFetching = false;
                state.user.error = true;
                state.msg = action.payload;
            },

        }
    }
})

export const {getUserStart , getUserSuccess , getUserFalse,deleteUserStart,deleteUserSuccess,deleteUserFalse} = userSlice.actions;

export default userSlice.reducer;
