import React from 'react';
import { string, shape, arrayOf, func, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';
import actionDisableButton from '../redux/actions/actionDisableButton';
import ShowButton from '../redux/actions/actionShowButton';
import actionResetFunction from '../redux/actions/actionResetFunction';
import actionAddScore from '../redux/actions/actionAddScore';
import actionAddAssertions from '../redux/actions/actionAddAssertions';
import { actionSetClassReducer } from '../redux/actions/actionClassReducer';
import '../pages/Game/Game.css';

const correctAnswer = 'correct-answer';
class BooleanAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.selectDataTest = this.selectDataTest.bind(this);
    this.handleClcik = this.handleClcik.bind(this);
    this.setScoreInGloblaState = this.setScoreInGloblaState.bind(this);
  }

  setScoreInGloblaState() {
    const { question, time, addScore } = this.props;
    const hardPoints = 3;
    const constant = 10;
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { player } = stateLocalStorage;
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
      this.setScoreInGloblaState();
      const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
      const { player } = stateLocalStorage;
      const totalAsserts = player.assertions + 1;
      addAssertions(totalAsserts);
    }
    setClassReducer();
    stateDisableButton(true);
    stateShowButton(true);
  }

  selectDataTest(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return correctAnswer;
  }

  render() {
    const { question, disableButton, classAnswers } = this.props;
    const { correctClass, wrongClass } = classAnswers;
    const answers = ['True', 'False'];
    const index = 0;
    return (
      <div className="trivia-container">
        <div className="question-container">
          <h3 className="question-category" data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question.replace(/&quot;/g, '"').replace(/&#039;/g, '`') }</p>
        </div>
        { answers.map((option) => {
          const dataTestId = this.selectDataTest(option, index);
          return (
            <button
              id={ dataTestId }
              className={ dataTestId === correctAnswer ? correctClass : wrongClass }
              type="button"
              key={ option }
              data-testid={ dataTestId }
              onClick={ this.handleClcik }
              disabled={ disableButton }
            >
              { option }
            </button>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.questionsReducer.timer,
  disableButton: state.questionsReducer.disableButton,
  classAnswers: state.classAnswersReducers,
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTime: () => dispatch(actionDecreaseTime()),
  stateDisableButton: (value) => dispatch(actionDisableButton(value)),
  stateShowButton: (value) => dispatch(ShowButton(value)),
  resetFunctions: () => dispatch(actionResetFunction()),
  addScore: (points) => dispatch(actionAddScore(points)),
  addAssertions: (assertions) => dispatch(actionAddAssertions(assertions)),
  setClassReducer: () => dispatch(actionSetClassReducer()),
});

BooleanAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
  addScore: func.isRequired,
  time: number.isRequired,
  stateDisableButton: bool.isRequired,
  stateShowButton: bool.isRequired,
  disableButton: bool.isRequired,
  addAssertions: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanAnswers);
