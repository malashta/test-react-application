import React, {Component, Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Drawer.module.css';
import Backdrop from "../../ui/Backdrop/Backdrop";

const links = [
  {to: '/', label: 'List quiz', exact: true},
  {to: '/auth', label: 'Autorization', exact: false},
  {to: '/quiz-create', label: 'Create quiz', exact: false}
];

class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    })
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
      </Fragment>
    );
  }
}

export default Drawer
