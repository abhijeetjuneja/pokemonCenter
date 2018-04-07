import React from 'react';
import { googleLogin } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GoogleLoginPage extends React.Component {
  componentWillMount(){
    this.props.googleLogin(this.props.params.token);
    this.props.router.push('/pokemons');
  }
  render() {
    return null;
  }
}
GoogleLoginPage.propTypes = {
  googleLogin: PropTypes.func.isRequired
}

GoogleLoginPage.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { googleLogin })(GoogleLoginPage);
