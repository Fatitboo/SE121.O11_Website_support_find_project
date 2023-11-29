import {configureStore} from '@reduxjs/toolkit';
import usersSlices from '../slices/users/usersSlices';
import skillsSlices from '../slices/skills/skillsSlices';
import occupationsSlices from '../slices/occupations/occupationsSlices';
import vacanciesSlices from '../slices/vacancies/vacanciesSlices';
const store = configureStore({
    reducer:{
        users: usersSlices.reducer,
        skills:skillsSlices.reducer,
        occupations: occupationsSlices.reducer,
        vacancies: vacanciesSlices.reducer,
    },
});
export default store;