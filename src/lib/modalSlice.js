import { createSlice } from '@reduxjs/toolkit';
import { QuestionnairePages } from '../components/questionnaire';

const initialState = {
    modalOpen: true,
    questionNumber: 0,
    questions: QuestionnairePages,
};

export const questions = createSlice({
    name: 'questions',
    initialState: initialState.questions,
    reducers: {
        setQuestions: (state, { payload }) => payload,
    },
});

export const modalOpen = createSlice({
    name: 'modalOpen',
    initialState: initialState.modalOpen,
    reducers: {
        setModalOpen: (state, { payload }) => payload,
    },
});

export const questionNumber = createSlice({
    name: 'questionNumber',
    initialState: initialState.questionNumber,
    reducers: {
        setQuestionNumber: (state, { payload }) => payload,
    },
});

export const { setModalOpen } = modalOpen.actions;
export const { setQuestionNumber } = questionNumber.actions;