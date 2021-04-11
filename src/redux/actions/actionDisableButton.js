import { DISABLE_BUTTON } from './actionTypes';

const actionDisableButton = (disableButton) => ({
  type: DISABLE_BUTTON,
  disableButton,
});

export default actionDisableButton;
