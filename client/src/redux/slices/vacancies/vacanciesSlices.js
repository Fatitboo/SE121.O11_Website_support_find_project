import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
const apiPrefix = 'api/v1/vacancies';

//create vacancy id
export const getAllVacancies = createAsyncThunk(
    'vacancies/getAllVacancies',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//create vacancy id
export const createVacancyId = createAsyncThunk(
    'vacancies/createVacancyId',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/posting`, payload, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//get vacancy component
export const getVacancyComponent = createAsyncThunk(
    'vacancies/getVacancyComponent',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/posting/${payload.id}/${payload.flag}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get vacancy component
export const getVacancyInfoDetail = createAsyncThunk(
    'vacancies/getVacancyInfoDetail',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-vacancy-by-id/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//update Vacancy Component
export const updateVacancyComponent = createAsyncThunk(
    'vacancies/updateVacancy',
    async (vacancy, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/posting/${vacancy.id}`, { ...vacancy.value }, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//update Vacancy Status
export const updateVacancyStatus = createAsyncThunk(
    'vacancies/updateStatusVacancy',
    async (dt, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            formData.append('status', dt.status)
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-status-vacancy/${dt.id}`, formData, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//delete Incomplete Vacancy 
export const deleteIncompleteVacancy = createAsyncThunk(
    'vacancies/deleteIncompleteVacancy',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.delete(`${baseUrl}/${apiPrefix}/delete-incomplete-vacancy/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get vacancy component
export const getVacancyCor = createAsyncThunk(
    'vacancies/getVacancyCor',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get(`${baseUrl}/api/v1/users/get-vacancy-cor/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
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
export function setValueSuccess(value) {
    return function setValueSuccess(dispatch, getState) {
        dispatch(vacanciesSlices.actions.setValueSuccess(value))
    }
}
export function resetComponent() {
    return function resetComponent(dispatch, getState) {
        dispatch(vacanciesSlices.actions.resetComponent())
    }
}

const vacanciesSlices = createSlice({
    name: 'vacancies',
    initialState: {
        loading: false,
        appErr: null,
        isSuccess: false,
        complete: [],
        incomplete: [],
        vacancyInfo: {},
        vacancies: []
    },
    reducers: {
        setValueSuccess: (state, action) => {
            state.isSuccess = action.payload
        },
        resetComponent: (state, action) => {
            delete state.currentJobComponent
        },
    },
    extraReducers: (builder) => {
            //get all vacancies
            builder.addCase(getAllVacancies.pending, (state, action) => {
                state.loading = true;
                state.isSuccess2 = false
            }),
            builder.addCase(getAllVacancies.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = action?.payload?.vacancies;
                state.isSuccess2 = true
            }),
            builder.addCase(getAllVacancies.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false
            }),

            //create vacancies id
            builder.addCase(createVacancyId.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = false
            }),
            builder.addCase(createVacancyId.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancyId = action?.payload.id;
                state.appErr = null;
                state.isSuccess = true
            }),
            builder.addCase(createVacancyId.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false
            }),
            //update vacancies
            builder.addCase(updateVacancyComponent.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = false
            }),
            builder.addCase(updateVacancyComponent.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess = true;
            }),
            builder.addCase(updateVacancyComponent.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            //update vacancy status
            builder.addCase(updateVacancyStatus.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(updateVacancyStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                let currentVacancy = state.vacancies.findIndex((v) => v.vacancyId === action?.payload?.updateVacancyId);
                if (currentVacancy !== -1) state.vacancies[currentVacancy].approvalStatus = action?.payload?.status;
                state.isSuccessUpd = true;
            }),
            builder.addCase(updateVacancyStatus.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUpd = false;
            }),
            //update vacancy status
            builder.addCase(deleteIncompleteVacancy.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(deleteIncompleteVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.incomplete = state.incomplete.filter(item => item.vacancyId !== action?.payload?.deleteIncplVacancyId);
                state.isSuccessUpd = true;
            }),
            builder.addCase(deleteIncompleteVacancy.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUpd = false;
            }),
            //get vacancy component
            builder.addCase(getVacancyComponent.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(getVacancyComponent.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.currentJobComponent = action?.payload.currentJobComponent;
            }),
            builder.addCase(getVacancyComponent.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            //get vacancy component
            builder.addCase(getVacancyCor.pending, (state, action) => {
                state.loading = true;
                state.isSuccess2 = false;
            }),
            builder.addCase(getVacancyCor.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess2 = true;
                state.incomplete = action?.payload?.incomplete;
                state.complete = action?.payload?.complete;
            }),
            builder.addCase(getVacancyCor.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;
            }),

            // 
            builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
                state.isSuccess2 = false;
                state.isSuccessUpd = false;
            }),
            //get vacancy info detail
            builder.addCase(getVacancyInfoDetail.pending, (state, action) => {
                state.loading = true;
                state.isSuccess2 = false;
            }),
            builder.addCase(getVacancyInfoDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess2 = true;
                state.vacancyInfo = action?.payload?.vacancyInfo;
            }),
            builder.addCase(getVacancyInfoDetail.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;
            })
    }
});

export default vacanciesSlices;