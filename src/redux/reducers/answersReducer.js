import { ADD_OPTION_ANSWERS, CLEAN_OPTION_ANSWERS } from '../actions/actionTypes';

const INITIAL_STATE = {
  optionAnswers: [],
};

const answersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_OPTION_ANSWERS:
    return {
      ...state,
      optionAnswers: action.optionAnswers,
    };
  case CLEAN_OPTION_ANSWERS:
    return {
      ...state,
      optionAnswers: [],
    };
  default:
    return state;
  }
};

export default answersReducer;
