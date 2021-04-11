import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bool, shape } from 'prop-types';
import './ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.getRanking = this.getRanking.bind(this);

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => ((b.score !== a.score) && b.score - a.score));
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    const { player } = this.props;
    const { validLogin } = player;
    if (!validLogin) return <Redirect to="/trivia-game/" />;
    return (
      <section>
        <div className="ranking-container">
          <header>
            <h1 data-testid="ranking-title">Ranking</h1>
            <Link exact to="/trivia-game">
              <button type="button" data-testid="btn-go-home">
                Home
              </button>
            </Link>
          </header>
          <ol>
            { ranking.map((value, index) => (
              <li key={ index } className="player-list">
                {console.log(value)}
                <div>
                  <img src={ value.picture } alt={ `Avata de ${value.name}` } />
                  <p>
                    {`${index + 1}º `}
                    <span data-testid={ `player-name-${index}` }>{ value.name }</span>
                  </p>
                </div>
                <p className="player-score">
                  <strong>Score:</strong>
                  &nbsp;
                  <span data-testid={ `player-score-${index}` }>{ value.score }</span>
                </p>
              </li>
            )) }
          </ol>
        </div>
      </section>
    );
  }
}

Ranking.propTypes = {
  player: shape({
    validLogin: bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerReducer.player,
});

export default connect(mapStateToProps)(Ranking);
