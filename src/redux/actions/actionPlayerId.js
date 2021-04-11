import { ADD_GRAVATAR } from './actionTypes';

const actionPlayerId = (name, gravatarEmail) => ({
  type: ADD_GRAVATAR,
  name,
  gravatarEmail,
});

export default actionPlayerId;
