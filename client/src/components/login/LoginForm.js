import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login,googleLoginRequest } from '../../actions/authActions';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';


function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.google = this.google.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }
  google(){
    this.props.googleLoginRequest().then((res) => {
      window.location = res.request.responseURL;
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <div className="text-center" style={{backgroundColor :'white', color:'#4ea8fc',minHeight:'70vh',paddingBottom:'5vh',marginTop : '7vh'}}>
        <form onSubmit={this.onSubmit}>
          <div style={{backgroundColor :'#4ea8fc',color:'white',padding:'5px 5px',marginBottom:'5vh'}}>
            <h2>Login to Pokemon Center!</h2><br></br>
          </div>


          { errors.form && <div className="alert alert-danger">{errors.form}</div> }

          <TextFieldGroup
            field="identifier"
            label="Username / Email"
            value={identifier}
            error={errors.identifier}
            onChange={this.onChange}
          />

          <TextFieldGroup
            field="password"
            label="Password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
          />

        <br></br><div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
        </form>
        <br></br><button disabled={this.state.isLoading || this.state.invalid} onClick={this.google} className="btn btn-warning btn-lg">
          Google +
        </button>
      </div>

    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  googleLoginRequest: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login,googleLoginRequest })(LoginForm);
