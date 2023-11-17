import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import baseUrl from '../../../utils/baseUrl'
const apiPrefix = 'api/v1/users';
// register user
export const registerUserAction = createAsyncThunk(
    'users/register',
    async (user, {rejectWithValue, getState, dispatch}) => {
        try {
            // http call 
            const config = {
                header:{
                    'Content-Type':'application/json',
                },
            };
            const {data} = await axios.post(`${baseUrl}/${apiPrefix}/register`, user, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// login user 
export const loginUserAction= createAsyncThunk(
    'users/login',
    async (userData, {rejectWithValue, getState, dispatch})=>{
        try {
            const config = {
                header:{
                    'Content-Type':'application/json',
                },
            };
            const {data} = await axios.post(`${baseUrl}/${apiPrefix}/login`, userData, config);
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// Logout user
export const logoutUserAction = createAsyncThunk(
    'users/logout',
    async (payload, {rejectWithValue, getState, dispatch})=>{
        try {
            localStorage.removeItem('userInfo')
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update avatar user 
export const updateAvatarAction = createAsyncThunk(
    'users/updateAvatar',
    async (avatar, {rejectWithValue, getState, dispatch})=>{
        try {
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            const formData = new FormData();
            formData.append('file', avatar.file);
            formData.append('publicId', avatar.publicId)
            const {data} = await axios.post(`${baseUrl}/${apiPrefix}/update-image-user/${userAuth?.user?.userId}`, formData,config);
            console.log(data)
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get profile user 
export const getUserProfileAction = createAsyncThunk(
    'users/getUserProfile',
    async (payload, {rejectWithValue, getState, dispatch})=>{
        try {
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/get-profile-user/${userAuth?.user?.userId}`,config);
            console.log(data)
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get resume seeker 
export const getUserResumeAction = createAsyncThunk(
    'users/getUserResume',
    async (payload, {rejectWithValue, getState, dispatch})=>{
        try {
            const user = getState()?.users;
            const {userAuth}=user;
            // http call 
            const config = {
                headers:{
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type':'application/json',
                },
            };
            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/get-resume-user/${userAuth?.user?.userId}`,config);
            console.log(data)
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get userAuth from local storage
const getUserAuth = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// Slice

const usersSlices = createSlice({
    name:'users',
    initialState:{
        userAuth:getUserAuth
    },
    extraReducers:(builder)=>{
        // register user 
        builder.addCase(registerUserAction.pending, (state, action)=>{
            state.loading=true;
            state.appErr = undefined;
        }),
        builder.addCase(registerUserAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.registered=action?.payload;
            state.appErr = undefined;
        }),
        builder.addCase(registerUserAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        }),
        // login user 
        builder.addCase(loginUserAction.pending, (state, action)=>{
            state.loading=true;
            state.appErr = undefined;
        }),
        builder.addCase(loginUserAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.userAuth=action?.payload;
            state.appErr = undefined;
        }),
        builder.addCase(loginUserAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        }),
        // logout user 
        builder.addCase(logoutUserAction.pending, (state, action)=>{
            state.loading=true;
            state.appErr = undefined;
        }),
        builder.addCase(logoutUserAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.userAuth=undefined;
            state.appErr = undefined;
        }),
        builder.addCase(logoutUserAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
         // get profile user 
         builder.addCase(getUserProfileAction.pending, (state, action)=>{
            state.loading=true;
            state.appErr = undefined;
        }),
        builder.addCase(getUserProfileAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.userProfile=action?.payload?.userProfile;
            state.appErr = undefined;
        }),
        builder.addCase(getUserProfileAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
        // get resume user 
        builder.addCase(getUserResumeAction.pending, (state, action)=>{
            state.loading=true;
            state.appErr = undefined;
        }),
        builder.addCase(getUserResumeAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.userProfile=action?.payload?.userResume;
            state.appErr = undefined;
        }),
        builder.addCase(getUserResumeAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
        // update avatar user 
        builder.addCase(updateAvatarAction.pending, (state, action)=>{
            state.loading=true;
            state.appErr = undefined;
        }),
        builder.addCase(updateAvatarAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.userProfile=action?.payload?.userResume;
            state.appErr = undefined;
        }),
        builder.addCase(updateAvatarAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
    }
    
});

export default usersSlices;