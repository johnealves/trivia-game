import { ADD_ASSERTIONS } from './actionTypes';

const actionAddAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  assertions,
});

export default actionAddAssertions;
