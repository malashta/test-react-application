import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

export default class Quiz extends Component{
  state = {
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {},
    quiz: [
      {
        question: 'What color is the sky?',
        id: Date.now() * Math.round(Math.random() * 10000),
        rightAnswerIndex: 1,
        answers: [
          {text: 'Black', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Blue', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Red', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Green', id: Date.now() * Math.round(Math.random() * 10000)}
        ]
      },
      {
        question: 'What is the zip code of Sydney?',
        id: Date.now() * Math.round(Math.random() * 10000),
        rightAnswerIndex: 3,
        answers: [
          {text: '1101', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: '2626', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: '2020', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: '2000', id: Date.now() * Math.round(Math.random() * 10000)}
        ]
      },
      {
        question: 'Which framework is cooler?',
        id: Date.now() * Math.round(Math.random() * 10000),
        rightAnswerIndex: 0,
        answers: [
          {text: 'React', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Vue', id: Date.now() * Math.round(Math.random() * 10000)},
          {text: 'Angular', id: Date.now() * Math.round(Math.random() * 10000)}
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const results = this.state.results;
    const questionId = [this.state.quiz[this.state.activeQuestion].id];

    const { rightAnswerIndex } = this.state.quiz[this.state.activeQuestion];
    const answerIndex = this.state.quiz[this.state.activeQuestion].answers
      .map(answer => answer.id)
      .indexOf(answerId);

    if (answerIndex === rightAnswerIndex) {

      if (!results[questionId]) {
        results[questionId] = 'success';
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({isFinished: true})
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[questionId] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  };

  componentDidMount() {
    console.log('Quiz ID: ', this.props.match.params.id)
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer the questions</h1>
          { this.state.isFinished
            ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
            : <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
              onAnswerClick={this.onAnswerClickHandler}
            />
          }
        </div>
      </div>
    )
  }
}

