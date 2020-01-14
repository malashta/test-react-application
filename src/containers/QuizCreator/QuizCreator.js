import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './QuizCreator.module.css'
import Button from "../../components/ui/Button/Button";
import {createControl} from '../../form/formFramework';
import Input from "../../components/ui/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/ui/Select/Select";

function createOptionControl(number) {
  return createControl({
    label: `Answer ${number}`,
    errorMessage: 'Answer is not be empty',
    id: number,
  }, {required: true});
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Input question',
      errorMessage: 'Question is not be empty'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizCreator extends Component {
  static defaultProps = {

  };

  static propTypes = {};

  state = {
    quiz: [],
    rightAnswerId: 1,
    formControls: createFormControls()
  };

  submitHandler = event => {

  };

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  changeHandler = () => {};

  selectChangeHandler = event => {
    this.setState({rightAnswerId: +event.target.value})
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary>
          <Input
            key={index}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          { index === 0 ?  <hr /> : null }
        </Auxiliary>
      );
    })
  }

  render() {
    const select = <Select
      label="Select correct answer"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: '1', value: 1},
        {text: '2', value: 2},
        {text: '3', value: 3},
        {text: '4', value: 4}
      ]}
    />;
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>

            <Button
              type="success"
              onClick={this.createQuizHandler}
            >
              Create quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
