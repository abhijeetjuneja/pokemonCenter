import React from 'react';
import PropTypes from 'prop-types';
import { getPokemonDetailsRequest } from '../../actions/pokemonActions';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.children[1],
      errors: {},
      isLoading: true,
      pokemon:{},
    };
  }
  componentDidMount(){
    this.props.getPokemonDetailsRequest(this.state.index).then((res) => {
      this.setState({pokemon : res.data,isLoading : false});
    });
  }
  toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  render() {
    if(!this.state.isLoading){
      const { types,sprites } = this.state.pokemon;
      const name = this.toTitleCase(this.state.pokemon.name);
      return (
        <div className="text-center">
          <img src={sprites.front_default}></img>
          <p>{name}</p>
        </div>

      );
    }
    else{
      return (
        <Spinner name="wordpress" color="red" style={{visibility: this.state.isLoading ? 'visible' : 'hidden',margin : '20px 20px'}} />
      );

    }

  }
}

export default connect(null, {  getPokemonDetailsRequest })(Favourite);
