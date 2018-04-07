import React from 'react';
import Profile from '../../components/profile/Profile';
import { connect } from 'react-redux';
import { getUserInfoRequest } from '../../actions/authActions';
import { getPokemonDetailsRequest } from '../../actions/pokemonActions';
import PropTypes from 'prop-types';

class ProfilePage extends React.Component {
  render() {
    const { getUserInfoRequest } = this.props;
    return (
      <div className="container-fluid">
        <Profile>
          getUserInfoRequest={getUserInfoRequest}
          getPokemonDetailsRequest={getPokemonDetailsRequest}
        </Profile>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getUserInfoRequest: PropTypes.func.isRequired,
  getPokemonDetailsRequest: PropTypes.func.isRequired,
}


export default connect(null, { getUserInfoRequest,getPokemonDetailsRequest })(ProfilePage);
