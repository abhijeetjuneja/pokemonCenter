import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right" style={{backgroundColor:'#4ea8fc',color:'white'}}>
        <li><a href="/pokemons" style={{backgroundColor:'#4ea8fc',color:'white'}}>Pokemons</a></li>
        <li><a href="/me"style={{backgroundColor:'#4ea8fc',color:'white'}} >My Profile</a></li>
        <li><a href="/" style={{backgroundColor:'#4ea8fc',color:'white'}} onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right" style={{backgroundColor:'#4ea8fc',color:'white'}}>
        <li><Link to="/signup" style={{backgroundColor:'#4ea8fc',color:'white'}}>Sign up</Link></li>
        <li><Link to="/login" style={{backgroundColor:'#4ea8fc',color:'white'}}>Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default" style={{backgroundColor:'#4ea8fc',color:'white',webkitboxShadow:'0 8px 6px -6px #5184f1',
    mozboxShadow: '0 8px 6px -6px #5184f1',boxShadow: '0 8px 6px -6px #5184f1'}}>
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" style={{backgroundColor:'#4ea8fc',color:'white'}}>Pokedex</Link>
          </div>

          <div className="collapse navbar-collapse" style={{backgroundColor:'#4ea8fc',color:'white'}}>
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
