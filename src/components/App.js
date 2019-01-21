import React, { Component } from 'react';

import Questions from './Questions';
import axios from 'axios';
import './App.css';

async function getQuestion() {
  const {
    data: { results },
  } = await axios.get('https://opentdb.com/api.php?amount=50&encode=url3986');
  return results;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      score: 0,
      isLoading: true,
      isGameStarted: false,
      isGameFinished: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const questions = await getQuestion();
    this.setState({
      isLoading: false,
      questions,
    });
  }

  startGame() {
    this.setState({ isGameStarted: true });
    setTimeout(() => {
      this.setState({ isGameStarted: false, isGameFinished: true });
    }, 15000);
  }

  addPointToScore() {
    this.setState({ score: this.state.score + 1 });
  }

  reset() {
    this.setState({
      questions: [],
      score: 0,
      isLoading: true,
      isGameStarted: false,
      isGameFinished: false,
    });
    this.fetchQuestions();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <div className="header">LOADING</div>
        </div>
      );
    } else if (this.state.isGameFinished) {
      return (
        <div className="App">
          <div className="header">
            <h1>TRIVIA</h1>
            <div>Temps écoulé !</div>
            <div className="score">Votre score : {this.state.score}</div>
            <button className="btn-game" onClick={this.reset.bind(this)}>
              Rejouer !
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="header">
          <h1>Trivia</h1>
          <p>Répondez à un maximum de question en 15s !</p>
          <div>
            <button className="btn-game" onClick={this.startGame.bind(this)}>
              Start!
            </button>
          </div>
        </div>
        <Questions
          questions={this.state.questions}
          score={this.state.score}
          addPointToScore={this.addPointToScore.bind(this)}
          isGameStarted={this.state.isGameStarted}
        />
      </div>
    );
  }
}
