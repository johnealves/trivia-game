import {
  ADD_NEW_QUESTIONS,
  DECREASE_TIME, QUESTION_REQUEST,
  RESET_TIMER_QUESTION, DISABLE_BUTTON,
  SHOW_BUTTON,
  RESET_FUNCTIONS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  questions: [],
  showButtonNextQuestion: false,
  disableButton: false,
  isFetching: true,
  timer: 30,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTION_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case ADD_NEW_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      questions: [...action.questions],
    };
  case DECREASE_TIME:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case RESET_TIMER_QUESTION:
    return { ...state, timer: 30 };
  case DISABLE_BUTTON:
    return {
      ...state,
      disableButton: action.disableButton,
    };
  case SHOW_BUTTON:
    return {
      ...state,
      showButtonNextQuestion: action.value,
    };
  case RESET_FUNCTIONS:
    return {
      ...state,
      showButtonNextQuestion: false,
      disableButton: false,
      timer: 5,
    };
  // case 'CLEAR_QUESTIONS':
  //   return {
  //     ...state,
  //     questions: [],
  //   };
  default:
    return state;
  }
};

export default questionsReducer;
