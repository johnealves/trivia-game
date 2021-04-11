import React, { Component } from 'react';
import { shape } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { player } = this.props;
    return (
      <header className="header">
        <div className="data-player-conatiner">
          <img
            src={ player.gravatarEmail }
            alt={ `Avatar ${player.name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ player.name }</p>
        </div>
        <div className="score-container">
          <p>
            Score:&nbsp;
            <span data-testid="header-score">{ player.score }</span>
          </p>
          <Link exact to="/trivia-game">
            <button type="button" data-testid="btn-go-home" className="btn-go-home">
              Sair
            </button>
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ playerReducer }) => ({
  player: playerReducer.player,
});

Header.propTypes = {
  player: shape().isRequired,
};

export default connect(mapStateToProps)(Header);
