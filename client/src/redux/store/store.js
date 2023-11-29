import {configureStore} from '@reduxjs/toolkit';
import usersSlices from '../slices/users/usersSlices';
import skillsSlices from '../slices/skills/skillsSlices';
import occupationsSlices from '../slices/occupations/occupationsSlices';
import accountVericationSlices from '../slices/accountVerication/accountVericationSlices';
const store = configureStore({
    reducer:{
        users: usersSlices.reducer,
        skills:skillsSlices.reducer,
        occupations: occupationsSlices.reducer,
        account: accountVericationSlices.reducer,
    },
});
export default store;