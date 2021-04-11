import React, { Component } from 'react';
import './loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default Loading;
