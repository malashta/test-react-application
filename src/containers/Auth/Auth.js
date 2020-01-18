import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import is from 'is_js';
import axios from 'axios';

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'email',
        errorMessage: 'Input correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'password',
        errorMessage: 'Input correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const {data} = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcuCoP7mYA1Hf0Cv2ROoom8Qy63q-zMM4', authData);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const {data} = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcuCoP7mYA1Hf0Cv2ROoom8Qy63q-zMM4', authData);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  submitHandler = event => {
    event.preventDefault();
  };

  renderInputs() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return (
          <Input
            key={controlName + index}
            type={control.type}
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event, controlName)}
          />
        );
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            { this.renderInputs() }

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth
