import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { auth } from '../firebase';
import Container from '../pjeset/Container.js';

import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
<Container>
  <div>
  <span><h1 className="title emerge">Sign Up</h1></span>
    <SignUpForm history={history} />
  </div>
  </Container>;

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
        email,
        passwordOne,
      } = this.state;

      const {
        history,
      } = this.props;
  
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey('username', event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey('passwordOne', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey('passwordTwo', event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />

        <div className="btn" disabled={isInvalid}>
          <button type="submit" value="Submit">Sign Up</button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <h4 className='name' style={{marginLeft: '30px'}}>
    Don't have an account? <Link className='signup' to={routes.SIGN_UP}>Sign Up</Link>
  </h4>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
