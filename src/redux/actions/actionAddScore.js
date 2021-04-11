import { ADD_SCORE } from './actionTypes';

const actionAddScore = (points) => ({
  type: ADD_SCORE,
  points,
});

export default actionAddScore;
