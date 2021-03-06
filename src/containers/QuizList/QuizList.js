import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './QuizList.module.css';
import axios from '../../axios/axios-quiz';
import Loader from "../../components/ui/Loader/Loader";

class QuizList extends Component {
  static defaultProps = {

  };

  static propTypes = {};

  state = {
    quizes: [],
    loading: true
  };

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={`/quiz/${quiz.id}`}>
            {quiz.name}
          </NavLink>
        </li>
      );
    })
  }

  async componentDidMount() {
    try {
      const {data} = await axios.get('quizes.json');

      const quizes = [];
      Object.keys(data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test ${index + 1}`
        })
      });

      this.setState({
        quizes,
        loading: false
      })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>

          { this.state.loading
            ? <Loader />
            : <ul>{this.renderQuizes()}</ul>
          }
        </div>
      </div>
    );
  }
}

export default QuizList;

