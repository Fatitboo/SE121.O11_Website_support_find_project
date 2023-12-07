import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import {redirect} from 'react-router-dom'
const apiPrefix = 'api/v1/projects';

//get all projects
export const getAllProjectsUser = createAsyncThunk(
    'project/getAllProjectsUser',
    async (payload, {rejectWithValue, getState, dispatch}) => {
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

            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/get-all-project-user/${payload.id}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)


//create project
export const createProject = createAsyncThunk(
    'projects/createProjectId',
    async (payload, {rejectWithValue, getState, dispatch}) => {
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
            console.log(payload.value)
            const {data} = await axios.post(`${baseUrl}/${apiPrefix}/create-project/${payload.id}`, payload.value, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)


//get project
export const getProjectSingle = createAsyncThunk(
    'projects/getProjectSingle',
    async (payload, {rejectWithValue, getState, dispatch}) => {
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
            console.log(payload.value)
            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/get-project-info/${payload.id}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

export function setValueSuccess(value){
    return function setValueSuccess(dispatch, getState){
        dispatch(projectsSlices.actions.setValueSuccess(value))
    }
}
const projectsSlices = createSlice({
    name:'projects',
    initialState:{
        loading: false,
        appErr: null,
        isSuccess: false,
        projects: [],
        project: {}
    },
    reducers:{
        setValueSuccess: (state, action) => {
            state.isSuccess = action.payload
        },
    },
    extraReducers:(builder)=>{

        //get all projects
        builder.addCase(getAllProjectsUser.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(getAllProjectsUser.fulfilled, (state, action)=>{
            state.loading=false;
            state.projects = action?.payload?.projects; 
        }),
        builder.addCase(getAllProjectsUser.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
        //create project
        builder.addCase(createProject.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess = false;
        }),
        builder.addCase(createProject.fulfilled, (state, action)=>{
            state.loading=false;
            state.projects.push(action.payload.project)
            state.isSuccess = true;
        }),
        builder.addCase(createProject.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        })
        //get project single
        builder.addCase(getProjectSingle.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(getProjectSingle.fulfilled, (state, action)=>{
            state.loading=false;
            state.project = action.payload.res;
        }),
        builder.addCase(getProjectSingle.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
    }    
});

export default projectsSlices;