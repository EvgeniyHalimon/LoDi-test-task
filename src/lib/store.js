// Setup redux store here
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { usersSlice } from './userSlice'
import { questions, modalOpen, questionNumber } from './modalSlice'

export const rootReducer = combineReducers({
    list: usersSlice.reducer,
    questions: questions.reducer,
    modalOpen: modalOpen.reducer,
    questionNumber: questionNumber.reducer,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store