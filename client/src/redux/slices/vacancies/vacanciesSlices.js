import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import {redirect} from 'react-router-dom'
const apiPrefix = 'api/v1/vacancies';

//create vacancy id
export const getAllVacancies = createAsyncThunk(
    'vacancies/getAllVacancies',
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

            const {data} = await axios.get(`${baseUrl}/${apiPrefix}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//create vacancy id
export const createVacancyId = createAsyncThunk(
    'vacancies/createVacancyId',
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

            const {data} = await axios.post(`${baseUrl}/${apiPrefix}/posting`, payload, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//get vacancy component
export const getVacancyComponent = createAsyncThunk(
    'vacancies/getVacancyComponent',
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

            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/posting/${payload.id}/${payload.flag}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//update Vacancy Component
export const updateVacancyComponent = createAsyncThunk(
    'vacancies/updateVacancy',
    async (vacancy, {rejectWithValue, getState, dispatch}) => {
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
            const {data} = await axios.put(`${baseUrl}/${apiPrefix}/posting/${vacancy.id}`, {...vacancy.value}, config);
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
        dispatch(vacanciesSlices.actions.setValueSuccess(value))
    }
}
export function resetComponent(){
    return function resetComponent(dispatch, getState){
        dispatch(vacanciesSlices.actions.resetComponent())
    }
}

const vacanciesSlices = createSlice({
    name:'vacancies',
    initialState:{
        loading: false,
        appErr: null,
        isSuccess: false,
    },
    reducers:{
        setValueSuccess: (state, action) => {
            state.isSuccess = action.payload
        },
        resetComponent: (state, action) => {
            delete state.currentJobComponent
        },
    },
    extraReducers:(builder)=>{
        //get all vacancies
        builder.addCase(getAllVacancies.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess=false
        }),
        builder.addCase(getAllVacancies.fulfilled, (state, action)=>{
            state.loading=false;
            state.vacancies = action?.payload?.vacancies; 
            state.isSuccess=true
        }),
        builder.addCase(getAllVacancies.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess=false
        })

        //create vacancies id
        builder.addCase(createVacancyId.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess=false
        }),
        builder.addCase(createVacancyId.fulfilled, (state, action)=>{
            state.loading=false;
            state.vacancyId = action?.payload.id; 
            state.appErr = null;
            state.isSuccess=true
        }),
        builder.addCase(createVacancyId.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess=false
        })
        //update vacancies
        builder.addCase(updateVacancyComponent.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess=false
        }),
        builder.addCase(updateVacancyComponent.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccess = true;
        }),
        builder.addCase(updateVacancyComponent.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        })

         //get vacancy component
        builder.addCase(getVacancyComponent.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(getVacancyComponent.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.currentJobComponent = action?.payload.currentJobComponent; 
        }),
        builder.addCase(getVacancyComponent.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
        })
    }    
});

export default vacanciesSlices;