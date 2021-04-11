import { CLEAR_CLASS_REDUCER, SET_CLASS_REDUCER } from './actionTypes';

export const actionSetClassReducer = () => ({
  type: SET_CLASS_REDUCER,
});

export const actionClearClassReducer = () => ({
  type: CLEAR_CLASS_REDUCER,
});
