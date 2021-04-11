import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import md5 from 'crypto-js/md5';
import { AiFillSetting } from 'react-icons/ai';
import fetchAPIToken from '../../services/apiToken';
import actionPlayerId from '../../redux/actions/actionPlayerId';
import
actionAddQuestions, { questionsRequest } from '../../redux/actions/actionAddQuestion';
import actionValidLogin from '../../redux/actions/actionValidLogin';
import actionResetCounter from '../../redux/actions/actionResetCounter';
import actionClearQuestions from '../../redux/actions/actionClearQuestion';
import actionCleanOptionAnswers from '../../redux/actions/actionCleanOptionAnswers';
import actionResetPlayer from '../../redux/actions/actionResetPlayer';
import actionResetFunction from '../../redux/actions/actionResetFunction';
import { actionClearClassReducer } from '../../redux/actions/actionClassReducer';
import './Login.css';
import Logo from '../../utils/img/TRIVIA-GAME.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkStatusButton = this.checkStatusButton.bind(this);

    this.state = {
      isDisable: true,
      name: '',
      email: '',
    };
  }

  componentDidMount() {
    this.clearQuestions();
  }

  clearQuestions() {
    const {
      actionClearQuestions: clearQuestions,
      actionCleanOptionAnswers: cleanOptionAnswers,
      actionResetPlayer: resetPlayer,
      questionsRequest: request,
      actionResetFunction: resetFunction,
      actionClearClassReducer: clearClassReducer,
    } = this.props;
    request();
    resetPlayer();
    clearQuestions();
    cleanOptionAnswers();
    resetFunction();
    clearClassReducer();
  }

  checkStatusButton() {
    const { name, email } = this.state;
    const minCharacters = 2;
    if (name.length > minCharacters && email.length > minCharacters) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  }

  async handleClick() {
    const {
      actionPlayerId: sendDataPlayerId,
      actionAddQuestions: requestQuestions,
      actionValidLogin: sendValidLogin,
      actionResetCounter: resetCounter,
    } = this.props;
    sendValidLogin();
    const { email, name } = this.state;
    const response = await fetchAPIToken();
    localStorage.setItem('token', response.token);
    const hash = md5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${hash}`;
    sendDataPlayerId(name, gravatarEmail);
    requestQuestions(response.token);
    resetCounter();
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    this.checkStatusButton();
  }

  render() {
    const { isDisable } = this.state;
    return (
      <div className="body-login">
        <div className="wrapper">
          <Link className="link" to="/trivia-game/settings" data-testid="btn-settings">
            <AiFillSetting />
          </Link>
          <img src={ Logo } alt="logo trivia game" />
          <div className="login-container">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            <Link to="/trivia-game/game">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ isDisable }
                onClick={ this.handleClick }
              >
                Jogar
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  actionPlayerId,
  actionAddQuestions,
  actionValidLogin,
  actionResetCounter,
  actionClearQuestions,
  actionCleanOptionAnswers,
  actionResetPlayer,
  questionsRequest,
  actionResetFunction,
  actionClearClassReducer,
};

Login.propTypes = {
  actionPlayerId: func.isRequired,
  actionAddQuestions: func.isRequired,
  actionValidLogin: func.isRequired,
  actionResetCounter: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
