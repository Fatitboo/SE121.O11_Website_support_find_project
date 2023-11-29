import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import baseUrl from '../../../utils/baseUrl'
const apiPrefix = 'api/v1/users';
// register user
export const registerUserAction = createAsyncThunk(
    'users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            // http call 
            const config = {
                header: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/register`, user, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// login user 
export const loginUserAction = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                header: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/login`, userData, config);
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// Logout user
export const logoutUserAction = createAsyncThunk(
    'users/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo')
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update avatar user 
export const updateAvatarAction = createAsyncThunk(
    'users/updateAvatar',
    async (avatar, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'multipart/form-data'

                },
            };
            const formData = new FormData();
            formData.append('file', avatar.file);
            formData.append('publicId', avatar.publicId);
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/update-image-user/${userAuth?.user?.userId}`, formData, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get profile user 
export const getUserProfileAction = createAsyncThunk(
    'users/getUserProfile',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-profile-user/${userAuth?.user?.userId}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get resume seeker 
export const getUserResumeAction = createAsyncThunk(
    'users/getUserResume',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-resume-user/${userAuth?.user?.userId}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update profile seeker 
export const updateUserProfileAction = createAsyncThunk(
    'users/updateUserProfile',
    async (info, { rejectWithValue, getState, dispatch }) => {
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

            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-user-information/${userAuth?.user?.userId}`, info, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update resume seeker 
export const updateUserResumeAction = createAsyncThunk(
    'users/updateUserResume',
    async (info, { rejectWithValue, getState, dispatch }) => {
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
            console.log(info)
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-seeker-resume/${userAuth?.user?.userId}`, info, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update cv seeker 
export const updateUserCvAction = createAsyncThunk(
    'users/updateUserCv',
    async (info, { rejectWithValue, getState, dispatch }) => {
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
            formData.append('file', info);
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/update-seeker-cv/${userAuth?.user?.userId}`, formData, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// delete cv seeker 
export const deleteUserCvAction = createAsyncThunk(
    'users/deleteUserCv',
    async (publicId, { rejectWithValue, getState, dispatch }) => {
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
            formData.append('publicId', publicId);
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/delete-seeker-cv/${userAuth?.user?.userId}`, formData, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get all cv user 
export const getAllUserCvAction = createAsyncThunk(
    'users/getAllUserCv',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-cv/${userAuth?.user?.userId}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get all  users
export const getAllUsersAction = createAsyncThunk(
    'users/getAllUsers',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-users`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get detail  user
export const getDetailUserAction = createAsyncThunk(
    'users/getDetailUser',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-user-by-id/${id}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//create verification token
export const resetPassSendTokenAction = createAsyncThunk(
    "users/tokenReset",
    async (username, { rejectWithValue, getState, dispatch }) => {
        // http call 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const formData = new FormData();
        formData.append('username', username)
        //http call
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/users/send-token-reset-by-email`, formData, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Verify Account
export const resetPasswordAction = createAsyncThunk(
    "users/resetPassword",
    async (data, { rejectWithValue, getState, dispatch }) => {
        // http call 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        //http call
        const formData = new FormData();
        formData.append('token', data.token);
        formData.append('newPassword', data.password);

        try {
            const { data } = await axios.put(
                `${baseUrl}/api/v1/users/update-token-reset`,
                formData,
                config
            );
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//Verify Account
export const resetSuccessAction = createAsyncThunk(
    "users/resetSuccess",
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
// get userAuth from local storage
const getUserAuth = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// Slice


const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: getUserAuth,
        cvUser: [],
        selectedCv: {},
        corList: []
    },
    reducers: {
        setSltCv: (state, action) => {
            state.selectedCv = action.payload
        }
    },
    extraReducers: (builder) => {
        // register user 
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
        }),
            builder.addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.registered = action?.payload;
                state.appErr = undefined;
            }),
            builder.addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // login user 
            builder.addCase(loginUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
            }),
            builder.addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = action?.payload;
                state.appErr = undefined;
            }),
            builder.addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // logout user 
            builder.addCase(logoutUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
            }),
            builder.addCase(logoutUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = undefined;
                state.appErr = undefined;
            }),
            builder.addCase(logoutUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            })
        // get profile user 
        builder.addCase(getUserProfileAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        }),
            builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action?.payload?.userProfile;
                state.appErr = undefined;
            }),
            builder.addCase(getUserProfileAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            })
        // get resume user 
        builder.addCase(getUserResumeAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;

        }),
            builder.addCase(getUserResumeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userResume = action?.payload?.userResume;
                state.appErr = undefined;
            }),
            builder.addCase(getUserResumeAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            })
        // update avatar user 
        builder.addCase(updateAvatarAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
        }),
            builder.addCase(updateAvatarAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = { ...state.userProfile, avatar: action?.payload?.image };
                state.appErr = undefined;
            }),
            builder.addCase(updateAvatarAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            })
        // update profile user 
        builder.addCase(updateUserProfileAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        }),
            builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = { ...state.userProfile, ...action?.payload?.userProfile };
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(updateUserProfileAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            })
        // update resume user 
        builder.addCase(updateUserResumeAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        }),
            builder.addCase(updateUserResumeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userResume = { ...state.userResume, ...action?.payload?.userResume };
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(updateUserResumeAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            })

        // get all cv
        builder.addCase(getAllUserCvAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;

        }),
            builder.addCase(getAllUserCvAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cvUser = action?.payload?.cvLinks;
                state.appErr = undefined;

            }),
            builder.addCase(getAllUserCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;

            })
        // update cv user 
        builder.addCase(updateUserCvAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        }),
            builder.addCase(updateUserCvAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cvUser.push(action?.payload?.cv);
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(updateUserCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            })
        // delete cv user 
        builder.addCase(deleteUserCvAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        }),
            builder.addCase(deleteUserCvAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cvUser = state.cvUser.filter((cv) => cv.publicId !== action?.payload?.deleteId);
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(deleteUserCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            })
        // get all cv
        builder.addCase(getAllUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;

        }),
            builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.corList = (action?.payload?.users).filter(item => item.userType === 'organizer');
                state.appErr = undefined;

            }),
            builder.addCase(getAllUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;

            })
        // get detail user
        builder.addCase(getDetailUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;

        }),
            builder.addCase(getDetailUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.seletedUser = action?.payload?.userDetail;
                state.appErr = undefined;

            }),
            builder.addCase(getDetailUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;

            })
        //create token
        builder.addCase(resetPassSendTokenAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });
        builder.addCase(resetPassSendTokenAction.fulfilled, (state, action) => {
            state.token = action?.payload?.token;
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;

        }
        );
        builder.addCase(resetPassSendTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        }
        );

        //reset pass account
        builder.addCase(resetPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;

        });
        builder.addCase(resetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;

        });
        builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
            state.isSuccess = false;
        });
    }

});
export const { setSltCv } = usersSlices.actions;
export default usersSlices;