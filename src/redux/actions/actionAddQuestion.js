import fecthAPITrivia from '../../services/apiTriva';
import {
  ADD_NEW_QUESTIONS,
  QUESTION_REQUEST,
} from './actionTypes';

export const questionsRequest = () => ({
  type: QUESTION_REQUEST,
});

const questionsRequestSuccess = (questions) => ({
  type: ADD_NEW_QUESTIONS,
  questions,
});

const actionAddQuestions = (token) => async (dispatch) => {
  dispatch(questionsRequest());
  try {
    const response = await fecthAPITrivia(token);
    return dispatch(questionsRequestSuccess(response.results));
  } catch (error) {
    return console.log(error);
  }
};

export default actionAddQuestions;
