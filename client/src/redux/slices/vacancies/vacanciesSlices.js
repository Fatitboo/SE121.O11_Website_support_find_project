import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import {redirect} from 'react-router-dom'
const apiPrefix = 'api/v1/vacancies';

//get all vacancies
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
//get current uncompleted vacancies components
export const getCurrentVacanciesComponent = createAsyncThunk(
    'vacancies/getCurrentVacanciesComponent',
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

            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/posting/${payload}`, config);
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
//get vacancy info detail
export const getVacancyInfoDetail = createAsyncThunk(
    'vacancies/getVacancyInfoDetail',
    async (id, {rejectWithValue, getState, dispatch}) => {
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

            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/get-vacancy-by-id/${id}`, config);
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
            console.log(vacancy)
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
//get vacancy component
export const getVacancyCor = createAsyncThunk(
    'vacancies/getVacancyCor',
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
            console.log(userAuth?.user?.userId)
            const {data} = await axios.get(`${baseUrl}/api/v1/users/get-vacancy-cor/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get uncompleted vacancy
export const getFullUnCompletedVacancy = createAsyncThunk(
    'vacancies/getUnVacancy',
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
            console.log(userAuth?.user?.userId)
            const {data} = await axios.get(`${baseUrl}/${apiPrefix}/uncompleted-vacancy/${payload}`, config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get uncompleted vacancy
export const postFullVacancy = createAsyncThunk(
    'vacancies/postFullVacancy',
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
            console.log(userAuth?.user?.userId)
            const {data} = await axios.post(`${baseUrl}/${apiPrefix}/post/${payload}`, payload , config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//Delete uncompletedVacancy
export const deleteuncompletedVacancyAction = createAsyncThunk(
    'projects/deleteUncompletedVacancy',
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
            const {data} = await axios.delete(`${baseUrl}/${apiPrefix}/delete-uncompleted-vacancy/${payload}` , config);
            return data;
        } catch (error) {
            if(!error?.response){
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//Set success
export const resetSuccessAction = createAsyncThunk(
    "vacancies/resetSuccess",
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
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
export function setVacancyId(value){
    return function setVacancyId(dispatch, getState){
        dispatch(vacanciesSlices.actions.setVacancyId(value))
    }
}

const vacanciesSlices = createSlice({
    name:'vacancies',
    initialState:{
        loading: false,
        appErr: null,
        isSuccess: false,
        complete:[],
        incomplete:[],
    },
    reducers:{
        setValueSuccess: (state, action) => {
            state.isSuccess = action.payload
            state.loadingUD = action.payload
            state.isSuccess3 = action.payload
        },
        resetComponent: (state, action) => {
            delete state.currentJobComponent
        },
        setVacancyId: (state, action) => {
            state.vacancyId = action.payload
        },
    },
    extraReducers:(builder)=>{
        //get all vacancies
        builder.addCase(getAllVacancies.pending, (state, action)=>{
            state.loading=true;
        }),
        builder.addCase(getAllVacancies.fulfilled, (state, action)=>{
            state.loading=false;
            state.vacancies = action?.payload?.vacancies; 
        }),
        builder.addCase(getAllVacancies.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
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
            state.loadingUD=true;
            state.isSuccess=false
        }),
        builder.addCase(updateVacancyComponent.fulfilled, (state, action)=>{
            state.loadingUD=false;
            state.loading=false;
            state.appErr = null;
            state.isSuccess = true;
        }),
        builder.addCase(updateVacancyComponent.rejected, (state, action)=>{
            state.loading=false;
            state.loadingUD=true;
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

        //get vacancy cor
        builder.addCase(getVacancyCor.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess2 = false;

        }),
        builder.addCase(getVacancyCor.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccess2 = true;
            state.incomplete = action?.payload?.incomplete;
            state.complete = action?.payload?.complete;
        }),
        builder.addCase(getVacancyCor.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess2 = false;

        })

        //get vacancy info detail
        builder.addCase(getVacancyInfoDetail.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess2 = false;
        }),
        builder.addCase(getVacancyInfoDetail.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccess2 = true;
            state.vacancyInfo = action?.payload?.vacancyInfo;
        }),
        builder.addCase(getVacancyInfoDetail.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess2 = false;

        })

        //get current vacancy component
        builder.addCase(getCurrentVacanciesComponent.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess3 = false;
        }),
        builder.addCase(getCurrentVacanciesComponent.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccess3 = true;
            state.currentJobComponent = action?.payload?.currentJobComponent;
            state.flag = action?.payload?.flag;
            state.vacancyId = action?.payload.id; 

        }),
        builder.addCase(getCurrentVacanciesComponent.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess3 = false;

        })

        //get uncompleted vacancy
        builder.addCase(getFullUnCompletedVacancy.pending, (state, action)=>{
            state.loading=true;
            state.isSuccess4 = false;
        }),
        builder.addCase(getFullUnCompletedVacancy.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccess4 = true;
            state.unCompletedVacancy = action?.payload?.unCompletedVacancy

        }),
        builder.addCase(getFullUnCompletedVacancy.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccess4 = false;

        })
        //get uncompleted vacancy
        builder.addCase(postFullVacancy.pending, (state, action)=>{
            state.loading=true;
            state.isSuccessCR = false;
        }),
        builder.addCase(postFullVacancy.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccessCR = true;
            state.vacancy = action?.payload?.vacancy

        }),
        builder.addCase(postFullVacancy.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccessCR = false;

        })
        //delete uncompleted vacancy
        builder.addCase(deleteuncompletedVacancyAction.pending, (state, action)=>{
            state.loading=true;
            state.isSuccessDL = false;
        }),
        builder.addCase(deleteuncompletedVacancyAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.appErr = null;
            state.isSuccessDL = true;
            state.incomplete = state.incomplete.filter((item) => item.vacancyId !== action.payload.id)
        }),
        builder.addCase(deleteuncompletedVacancyAction.rejected, (state, action)=>{
            state.loading=false;
            state.appErr = action?.payload?.message;
            state.isSuccessDL = false;
        })

    }    
});

export default vacanciesSlices;