import React from 'react';
import { googleCallbackRequest } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GoogleCallbackPage extends React.Component {
  componentWillMount(){
    console.log(this.props);
    var url = this.props.location.pathname + this.props.location.search;
    this.props.googleCallbackRequest(url).then((res) =>{
      if(res.data.error)
      this.props.router.push('/googleerror');
      else {
        this.props.router.push('/google/'+res.data.token);
      }
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
