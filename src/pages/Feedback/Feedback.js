import React from 'react';
import { connect } from 'react-redux';
import { number, shape, func } from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import actionNewGame from '../../redux/actions/actionNewGame';
import actionResetCounter from '../../redux/actions/actionResetCounter';
import actionCleanOptionAnswers from '../../redux/actions/actionCleanOptionAnswers';
import './Feedback.css';
import winImg from '../../utils/img/win.png';
import lostImg from '../../utils/img/face-cry.png';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.feedbackImg = this.feedbackImg.bind(this);
    this.renderBtnContainer = this.renderBtnContainer.bind(this);
    this.state = {
      isNewGame: false,
    };
  }

  componentDidMount() {
    const { player } = this.props;
    this.setRanking(player);
  }

  setRanking(player) {
    const initialRanking = JSON.parse(localStorage.getItem('ranking'));
    const rankingArray = [];
    if (initialRanking !== null) {
      rankingArray.push(...initialRanking);
    }
    const objRanking = {
      name: player.name,
      score: player.score,
      picture: player.gravatarEmail,
    };
    rankingArray.push(objRanking);
    localStorage.setItem('ranking', JSON.stringify(rankingArray));
  }

  feedbackImg(assertions) {
    return assertions > 2
      ? <img src={ winImg } alt="You win! Good Job" />
      : <img src={ lostImg } alt="You lost! Could be better" />;
  }

  handleClick() {
    const { startNewGame, resetTimer, cleanOptionAnswers } = this.props;
    startNewGame();
    resetTimer();
    cleanOptionAnswers();
    this.setState({
      isNewGame: true,
    });
  }

  renderBtnContainer() {
    return (
      <nav className="btn-container">
        <Link
          to="/ranking"
          data-testid="btn-ranking"
          className="btn-ranking btn-default"
          onClick={ this.handleClick }
        >
          Ver Ranking
        </Link>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
          className="btn-play-again btn-default"
        >
          Jogar Novamente
        </button>
      </nav>
    );
  }

  render() {
    const { player } = this.props;
    const { assertions, score, validLogin } = player;
    const { isNewGame } = this.state;
    if (!validLogin) return <Redirect exact to="/" />;
    if (isNewGame) return <Redirect to="/" />;
    return (
      <div>
        <Header />
        <main className="main-container">
          <section className="feedback-container">
            { this.feedbackImg(assertions) }
            <p data-testid="feedback-text" className="feedback-text">
              { assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
            </p>
            <p className="text-default">
              Você acertou&nbsp;
              <span data-testid="feedback-total-question">
                { assertions }
              </span>
              &nbsp;questões!
            </p>
            <p className="text-default">
              Um total de&nbsp;
              <span data-testid="feedback-total-score">
                { score }
              </span>
              &nbsp;pontos!
            </p>
            { this.renderBtnContainer() }
          </section>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: shape({
    assertions: number,
  }).isRequired,
  startNewGame: func.isRequired,
  resetTimer: func.isRequired,
  cleanOptionAnswers: func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerReducer.player,
});

const mapDispatchToProps = (dispatch) => ({
  startNewGame: () => dispatch(actionNewGame()),
  resetTimer: () => dispatch(actionResetCounter()),
  cleanOptionAnswers: () => dispatch(actionCleanOptionAnswers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
