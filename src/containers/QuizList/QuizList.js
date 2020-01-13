import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './QuizList.module.css';

class QuizList extends Component {
  static defaultProps = {

  };

  static propTypes = {};

  state = {};

  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li
          key={index}
        >
          <NavLink to={`/quiz/${quiz}`}>
            Test {quiz}
          </NavLink>
        </li>
      );
    })
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Quiz List</h1>

          <ul>
            { this.renderQuizes() }
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;

