import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'

export default class Quiz extends Component{
  state = {
    quiz: [
      {
        answers: [
          {text: 'Question 1'},
          {text: 'Question 2'},
          {text: 'Question 3'},
          {text: 'Question 4'}
        ]
      }
    ]
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer the questions</h1>
          <ActiveQuiz answers={this.state.quiz[0].answers}/>
        </div>
      </div>
    )
  }
}

