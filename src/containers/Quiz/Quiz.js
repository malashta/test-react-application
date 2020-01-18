import React, {Component} from 'react'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import classes from './Quiz.module.css'
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz';

export default class Quiz extends Component{
  state = {
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {},
    loading: true,
    quiz: []
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

    const { rightAnswerId } = this.state.quiz[this.state.activeQuestion];

    if (answerId === rightAnswerId) {

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

  async componentDidMount() {
    try {
      const {data: quiz} = await axios.get(`quizes/${this.props.match.params.id}.json`);
      this.setState({quiz, loading: false})
    } catch (e) {
      console.error(e);
    }
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

          {
            this.state.loading
              ? null
              : this.state.isFinished
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

