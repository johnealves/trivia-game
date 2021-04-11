const actionClearQuestion = () => {
  console.log('clear question');
  return ({
    type: 'CLEAR_QUESTIONS',
  });
};

export default actionClearQuestion;
