import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import questionsReducer from './questionsReducer';
import answersReducer from './answersReducer';
import classAnswersReducers from './classAnswersReducer';

const rootReducers = combineReducers({
  playerReducer,
  questionsReducer,
  answersReducer,
  classAnswersReducers,
});

export default rootReducers;
