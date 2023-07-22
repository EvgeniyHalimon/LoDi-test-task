import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { urls, userApi } from './userApi';
import { modalOpen } from './modalSlice'

export const getQuestions = createAsyncThunk('thunk/get', async (_, thunkAPI) => {
    const response = await userApi.get(urls.questionnaireList);
    if(response.data.length !== 0){
        thunkAPI.dispatch(modalOpen.actions.setModalOpen(false));
    }
    return response.data;
});

export const getQuestionByID = createAsyncThunk('thunk/getByID', async (id) => {
    const response = await userApi.get(urls.questionnaireRead(id));
    return response.data;
});

export const createQuestion = createAsyncThunk('thunk/post', async (data) => {
    const response = await userApi.post(urls.questionnaireCreate, data);
    return response.data;
});

export const updateQuestion = createAsyncThunk('thunk/put', async (id, data) => {
    const response = await userApi.put(urls.questionnaireUpdate(id), data);
    return response.data;
});

export const patchQuestion = createAsyncThunk('thunk/patch', async (id, data) => {
    const response = await userApi.patch(urls.questionnairePartialUpdate(id), data);
    return response.data;
});

export const deleteQuestion = createAsyncThunk('thunk/purge', async (id) => {
    const response = await userApi.deleteData(urls.questionnaireDelete(id));
    return response.data;
});

const initialState = {
    list: null,
    listByID: null
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestions.fulfilled, (state, action) => {
            state.list = action.payload;
        })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.list.push(action.payload.data);
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {

            })
            .addCase(patchQuestion.fulfilled, (state, action) => {

            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                return state.list.filter((user) => user.id !== action.payload);
            })
            .addCase(getQuestionByID.fulfilled, (state, action) => {
                state.listByID.push(action.payload);
            });
    },
});

