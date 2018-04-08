import React from 'react';
import PropTypes from 'prop-types';
import { PokemonContainer,PokemonHead } from './styles';
import Spinner from 'react-spinkit';

const mapColors = [
  {key : 'normal',value : '#808080'},
  {key : 'fighting',value : '#131313'},
  {key : 'flying',value : '#7accfd'},
  {key : 'poison',value : 'red'},
  {key : 'ground',value : 'brown'},
  {key : 'rock',value : 'grey'},
  {key : 'bug',value : '#7905A4'},
  {key : 'ghost',value : '#04006A'},
  {key : 'steel',value : '#9E9E9E'},
  {key : 'fire',value : '#FE5136'},
  {key : 'water',value : '#1097E5'},
  {key : 'grass',value : 'green'},
  {key : 'electric',value : '#9D930C'},
  {key : 'psychic',value : 'yellow'},
  {key : 'ice',value : '#9692FB'},
  {key : 'dragon',value : '#ED860F'},
  {key : 'dark',value : '#570164'},
  {key : 'fairy',value : '#FE06CD'},
  {key : 'unknown',value : 'purple'},
  {key : 'shadow',value : '#8B03D0'}
];

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: '',
      errors: {},
      isLoading: true,
      favourite: false,
      shadowColor:'#f4f4f4',
      bgColor:'#f4f4f4'
    };
    this.onClick = this.onClick.bind(this);
  }
  setColor(c){
    for(var i=0;i<mapColors.length;i++)
    {
      if(c.length>1)
      {
        if(c[0].type.name == mapColors[i].key)
          this.setState({shadowColor : mapColors[i].value});
        if(c[1].type.name == mapColors[i].key)
          this.setState({bgColor : mapColors[i].value});
      }
      else{
        if(c[0].type.name == mapColors[i].key)
          this.setState({bgColor : mapColors[i].value});
      }
    }
  }
  toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  componentDidMount(){
    this.setState({favourite : this.props.children[11]});
    this.props.children[3](this.props.children[5]).then((res) => {
      this.setState({pokemon : res.data,isLoading : false});
      this.setColor(res.data.types);
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({favourite : nextProps.children[11],isLoading : true,pokemon:{}});
    nextProps.children[3](nextProps.children[5]).then((res) => {
      this.setState({pokemon : res.data,isLoading : false});
      this.setColor(res.data.types);
    });
  }
  checkFavourite(array){
    console.log(this.props.children);
    var index = this.props.children[5] + 1;
  }
  onClick() {
    this.props.children[7](this.props.children[5]).then((res) => {
      this.setState({favourite:true});
    });
  }

  render() {
    const { bgColor,shadowColor} = this.state;
    if(!this.state.isLoading){
      const { types,sprites,weight,height,base_experience } = this.state.pokemon;
      const name = this.toTitleCase(this.state.pokemon.name);
      return (
        <PokemonContainer bgColor={bgColor} shadowColor={shadowColor}>
          <img width='150px' height='150px' src={sprites.front_default} />
            <h2>{name}</h2>
            <p>Weight - {weight}</p>
            <p>Height - {height}</p>
            <p>Experience - {base_experience}</p>
          <button className="btn btn-success btn-block" onClick={this.onClick} disabled={this.state.favourite}>Add to Favourites</button>
        </PokemonContainer>
      );
    }
    else{
      return (
        <PokemonContainer bgColor={bgColor} shadowColor={shadowColor}>
          <Spinner name="wordpress" color="red" style={{visibility: this.state.isLoading ? 'visible' : 'hidden',margin : '120px 120px'}} />
        </PokemonContainer>

      );

    }

  }
}

export default Pokemon;
