import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Feedback from './pages/Feedback/Feedback';
import Game from './pages/Game/Game';
import Ranking from './pages/Ranking/Ranking';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/trivia-game" component={ Login } />
      <Route path="/trivia-game/settings" component={ Settings } />
      <Route path="/trivia-game/game" component={ Game } />
      <Route path="/trivia-game/feedback" component={ Feedback } />
      <Route path="/trivia-game/ranking" component={ Ranking } />
    </Switch>
  );
}
