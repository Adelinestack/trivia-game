import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import './Questions.css';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: 0,
    };
  }

  onAnswerClick(correct_answer, answerClicked) {
    if (correct_answer === answerClicked) {
      this.props.addPointToScore();
    }
    this.setState({
      questionId: this.state.questionId + 1,
    });
  }

  render() {
    if (this.props.isGameStarted) {
      const {
        question,
        correct_answer,
        incorrect_answers,
      } = this.props.questions[this.state.questionId];
      const answers = shuffle([correct_answer, ...incorrect_answers]);
      const answersList = answers.map(answer => (
        <button
          className="btn-answer"
          onClick={this.onAnswerClick.bind(this, correct_answer, answer)}
        >
          {decodeURIComponent(answer)}
        </button>
      ));

      return (
        <div>
          <div>{decodeURIComponent(question)}</div>
          <div className="answers-list">{answersList}</div>
          <div>
            {this.props.score} / {this.state.questionId}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
