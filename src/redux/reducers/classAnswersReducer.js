import { CLEAR_CLASS_REDUCER, SET_CLASS_REDUCER } from '../actions/actionTypes';

const INITIAL_STATE = {
  correctClass: 'option-answer',
  wrongClass: 'option-answer',
};

const classAnswersReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CLASS_REDUCER:
    return {
      correctClass: 'correct-answer',
      wrongClass: 'wrong-answer',
    };
  case CLEAR_CLASS_REDUCER:
    return {
      correctClass: 'option-answer',
      wrongClass: 'option-answer',
    };
  default:
    return state;
  }
};

export default classAnswersReducers;
