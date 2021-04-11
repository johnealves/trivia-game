import {
  ACTIVE_LOGIN,
  ADD_ASSERTIONS,
  ADD_GRAVATAR,
  ADD_SCORE,
  NEW_GAME,
  RESET_PLAYER } from '../actions/actionTypes';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    validLogin: false,
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIVE_LOGIN:
    return { ...state, player: { ...state.player, validLogin: true } };
  case ADD_GRAVATAR:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.name,
        gravatarEmail: action.gravatarEmail,
        validLogin: true,
      },
    };
  case ADD_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.points,
      },
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: action.assertions,
      },
    };
  case NEW_GAME:
    return {
      ...state,
      player: {
        ...state.player,
        score: 0,
        assertions: 0,
      },
    };
  case RESET_PLAYER:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default playerReducer;
