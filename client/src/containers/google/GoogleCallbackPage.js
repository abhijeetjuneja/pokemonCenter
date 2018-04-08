import React from 'react';
import { googleCallbackRequest } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GoogleCallbackPage extends React.Component {
  componentWillMount(){
    console.log(this.props);
    var url = this.props.location.pathname + this.props.location.search;
    this.props.googleCallbackRequest(url).then((res) =>{
      console.log("done");
    });
  }
  render() {
    return null;
  }
}
GoogleCallbackPage.propTypes = {
  googleCallbackRequest: PropTypes.func.isRequired
}

export default connect(null, { googleCallbackRequest })(GoogleCallbackPage);
