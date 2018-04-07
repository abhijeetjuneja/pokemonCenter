import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GoogleErrorPage extends React.Component {
  render() {
    return(
      <div class="text-center">
        <h1>Sorry this email isn't registered yet !</h1>
        <br></br><br></br><br></br><br></br>
        <a href="/signup"><button className="btn btn-success btn-lg">
          Go to Signup
        </button></a>
      </div>
    );

  }
}

export default connect(null)(GoogleErrorPage);
