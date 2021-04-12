import React from 'react';
import { string, shape, arrayOf, number, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import actionAddScore from '../redux/actions/actionAddScore';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';
import actionDisableButton from '../redux/actions/actionDisableButton';
import ShowButton from '../redux/actions/actionShowButton';
import actionResetFunction from '../redux/actions/actionResetFunction';
import actionAddOptionAnswers from '../redux/actions/actionAddOptionAnswers';
import actionAddAssertions from '../redux/actions/actionAddAssertions';
import { actionSetClassReducer } from '../redux/actions/actionClassReducer';
import '../pages/Game/Game.css';

const correctAnswer = 'correct-answer';
class MultipleAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.randomAnswer = this.randomAnswer.bind(this);
    this.selectDataTest = this.selectDataTest.bind(this);
    // this.initialState = this.initialState.bind(this);

    this.handleClcik = this.handleClcik.bind(this);
    this.setScoreInGlobalState = this.setScoreInGlobalState.bind(this);
  }

  setScoreInGlobalState() {
    const { question, time, addScore } = this.props;
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player } = stateLocalStorage;
    const hardPoints = 3;
    const constant = 10;
    let difficultyNumber;
    if (question.difficulty === 'hard') difficultyNumber = hardPoints;
    if (question.difficulty === 'medium') difficultyNumber = 2;
    if (question.difficulty === 'easy') difficultyNumber = 1;
    const points = (constant + (time * difficultyNumber)) + player.score;
    addScore(points);
  }

  handleClcik({ target }) {
    const {
      stateDisableButton,
      stateShowButton,
      addAssertions,
      setClassReducer,
    } = this.props;
    const { id } = target;
    if (id === correctAnswer) {
      this.setScoreInGlobalState();
      const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
      const { player } = stateLocalStorage;
      const totalAsserts = player.assertions + 1;
      addAssertions(totalAsserts);
    }
    setClassReducer();
    stateDisableButton(true);
    stateShowButton(true);
  }

  selectDataTest(question, option, index) {
    // const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return correctAnswer;
  }

  randomAnswer(question) {
    const { addOptionAnswers } = this.props;
    const optionAnswers = question.incorrect_answers;
    const maxNumber = 4;
    if (optionAnswers.length < maxNumber) {
      optionAnswers
        .splice(Math.floor(Math.random() * maxNumber), 0, question.correct_answer);
    }
    addOptionAnswers(optionAnswers);
  }

  render() {
    const { question, disableButton, optionAnswers, classAnswers } = this.props;
    const { correctClass, wrongClass } = classAnswers;
    if (optionAnswers.length === 0) {
      this.randomAnswer(question);
    }
    let index = 0;
    return (
      <div className="trivia-container">
        <div className="question-container">
          <h3 className="question-category" data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">
            { question.question.replace(/&quot;/g, '"').replace(/&#039;/g, '`') }
          </p>
        </div>
        {optionAnswers.map((option) => {
          const dataTestId = this.selectDataTest(question, option, index);
          if (dataTestId !== correctAnswer) index += 1;
          return (
            <button
              id={ dataTestId }
              className={ dataTestId === correctAnswer ? correctClass : wrongClass }
              type="button"
              key={ option }
              data-testid={ dataTestId }
              disabled={ disableButton }
              onClick={ this.handleClcik }
            >
              { option.replace(/&quot;/g, '"').replace(/&#039;/g, '`') }
            </button>);
        })}
      </div>
    );
  }
}

const mapStateToProps = ({
  playerReducer,
  questionsReducer,
  answersReducer,
  classAnswersReducers,
}) => ({
  time: questionsReducer.timer,
  disableButton: questionsReducer.disableButton,
  player: playerReducer.player,
  optionAnswers: answersReducer.optionAnswers,
  assertions: playerReducer.assertions,
  classAnswers: classAnswersReducers,
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTime: () => dispatch(actionDecreaseTime()),
  stateDisableButton: (value) => dispatch(actionDisableButton(value)),
  stateShowButton: (value) => dispatch(ShowButton(value)),
  resetFunctions: () => dispatch(actionResetFunction()),
  addScore: (points) => dispatch(actionAddScore(points)),
  addOptionAnswers: (value) => dispatch(actionAddOptionAnswers(value)),
  addAssertions: (assertions) => dispatch(actionAddAssertions(assertions)),
  setClassReducer: () => dispatch(actionSetClassReducer()),
});

MultipleAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
  addScore: func.isRequired,
  time: number.isRequired,
  stateDisableButton: bool.isRequired,
  stateShowButton: bool.isRequired,
  disableButton: bool.isRequired,
  optionAnswers: arrayOf().isRequired,
  addOptionAnswers: func.isRequired,
  addAssertions: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);
