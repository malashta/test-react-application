import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'

export default class Quiz extends Component{
  state = {
    quiz: [
      {
        question: 'What color is the sky?',
        rightAnswerIndex: 1,
        answers: [
          {text: 'Black', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Blue', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Red', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Green', id: Date.now() * Math.round(Math.random() * 10000)}
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    console.log('Answer Id: ', answerId)
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer the questions</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}

