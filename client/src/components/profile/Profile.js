import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Favourite from './Favourite';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      errors: {},
      isLoading: true,
      detailRequest: ''
    };

  }

  componentWillMount(){
    this.setState({detailRequest:this.props.children[3]});
    this.props.children[1]().then((res) => {
      this.setState({user : res.data.user,isLoading :false});
      console.log(this.state.user);
    });
  }



  render() {
    const { errors, user, password, isLoading } = this.state;
    let request = this.state.detailRequest;

      if(!this.state.isLoading){
        return (
          <div className="container-fluid row text-center">
            <div className="col-md-offset-3 col-md-6 col-xs-offset-0 col-xs-12" style={{backgroundColor:'white',padding:'0px 0px'}}>
              <strong><h1 style={{backgroundColor:'#4ea8fc',color:'white',padding :'12px 12px',margin:'0px 0px 60px 0px'}}>Profile Info</h1>
              <h2 style={{padding :'12px 12px'}}>Name - {user.username}</h2><hr />
              <h2 style={{padding :'12px 12px'}}>Email - {user.email}</h2><hr></hr>
              <div className="row text-center">
                <h4 style={{padding :'12px 12px'}}>Your Favourites :</h4><hr></hr>
                {user.favourites.map((item, index) => {
                  var i = item.id -1;
                  return(
                    <div className="col-md-2">
                      <Favourite>
                        index={i}
                      </Favourite>
                    </div>
                  );
                })}
              </div>
              </strong>
            </div>
          </div>
        );
      }
      else return null;

  }
}


export default Profile;
