import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

class Auth extends Component {

  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            <Input type="text" label="email" />
            <Input type="password" label="password" />

            <Button
              type="success"
              onClick={this.loginHandler}
            >
              Login
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
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
