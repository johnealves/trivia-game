import { ADD_OPTION_ANSWERS } from './actionTypes';

const actionAddOptionAnswers = (optionAnswers) => ({
  type: ADD_OPTION_ANSWERS,
  optionAnswers,
});

export default actionAddOptionAnswers;
