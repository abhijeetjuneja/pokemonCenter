import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import SearchBox from '../common/SearchBox';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
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


class PokemonIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      errors: {},
      isLoading: true,
      limit:20,
      offset:0,
      next:null,
      previous:'',
      detailRequest:'',
      addPokemonToFavouritesRequest:'',
      getFavouritesRequest:'',
      favourites:[],
      searchFilter:'',
      categoryFilter:''
    };
    this.onChange = this.onChange.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentWillMount(){
    this.setState({detailRequest:this.props.getPokemonDetailsRequest,addPokemonToFavouritesRequest : this.props.addPokemonToFavouritesRequest
    ,getFavouritesRequest:this.props.getFavouritesRequest});
    this.props.getFavouritesRequest().then(res => {
      this.setState({favourites : res.data});
    });
    this.props.getPokemonsRequest(0,20).then(res => {
      this.setState({pokemons:res.data.results,next:res.data.next,isLoading : false});
    });
  }

  checkFavourite(v){
    for(var i=0;i<this.state.favourites.length;i++)
    {
      if(this.state.favourites[i].id == v)
        return true;
    }
    return false;
  }

  previous(){
    var offset = this.state.offset;
    offset = offset - this.state.limit;
    this.setState({offset : offset,isLoading:true});
    this.props.getPokemonsRequest(offset,this.state.limit).then(res => {
      this.setState({pokemons:res.data.results,next:res.data.next,isLoading : false});
    });
  }

  next(){
    var offset = this.state.offset;
    offset = offset + this.state.limit;
    this.setState({offset : offset,isLoading:true});
    this.props.getPokemonsRequest(offset,this.state.limit).then(res => {
      this.setState({pokemons:res.data.results,next:res.data.next,isLoading : false});
    });
  }

  filter(v,next){
    var matchedPokemons = v.filter((v) => {
      return v['name'].startsWith(this.state.searchFilter);
    });
    this.setState({pokemons:matchedPokemons,isLoading:false,next:next});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value ,isLoading : true});
    if(e.target.value == ''){
      this.props.getPokemonsRequest(0,this.state.limit).then(res => {
        this.setState({pokemons:res.data.results,next:res.data.next,isLoading : false});
      });
    }
    else{
      this.props.getPokemonsRequest(0,949).then(res => {
        this.filter(res.data.results,res.data.next);
      });
    }

  }

  getIndex(item){
    var numbers = item.url.match(/\d+/g).map(Number);
    return numbers[1]-1;
  }
  toTitleCase(str){
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  render() {
    var { errors,pokemons,isLoading,detailRequest,addPokemonToFavouritesRequest,getFavouritesRequest,offset } = this.state;
    const filter = this.filter;
    var main = this;
    return (
      <div>
        <SearchBox name="searchFilter" value={this.state.searchFilter} onChange={this.onChange} type="text" placeholder="Search.." />
        <Spinner name="ball-spin-fade-loader" style={{visibility: this.state.isLoading ? 'visible' : 'hidden' , position:'fixed',top:'50%',left:'47%'}} />
        <div className="text-center" style={{margin:'30vh 0px',color:'red',visibility: !this.state.isLoading ? 'visible' : 'hidden',display : this.state.pokemons.length == 0 ? 'block' : 'none'}}>
          <h1>Sorry No Pokemons Found !</h1>
        </div>
        <div className="row" style={{visibility: !this.state.isLoading ? 'visible' : 'hidden'}}>
          {pokemons.map((item, index) => {
            var i = this.getIndex(item);
            var favourite = main.checkFavourite(i+1);
            return(
              <div className="col-md-3 col-sm-6 col-xs-12" style={{margin : '5vh 0px 5vh 0px'}} key={index}>
                <Pokemon>
                  pokemon={item}
                  getPokemonDetailsRequest={detailRequest}
                  index={i}
                  addPokemonToFavouritesRequest={addPokemonToFavouritesRequest}
                  getFavouritesRequest={getFavouritesRequest}
                  favourite={favourite}
                </Pokemon>
              </div>
            )
          })}
          <br></br><br></br><br></br><br></br>
          <div className="text-center" style={{margin:'5vh auto'}}>
            <button className="btn btn-info btn-lg" disabled={this.state.offset==0 || this.state.pokemons.length == 0} onClick={this.previous}>Previous</button>&nbsp;&nbsp;&nbsp;
            <button className="btn btn-info btn-lg" disabled={this.state.next == null} onClick={this.next}>Next</button>
          </div>
        </div>
      </div>

    );
  }
}

PokemonIndex.propTypes = {
  getPokemonsRequest: PropTypes.func.isRequired,
  getPokemonDetailsRequest: PropTypes.func.isRequired,
  addPokemonToFavouritesRequest: PropTypes.func.isRequired,
  getFavouritesRequest: PropTypes.func.isRequired
}

export default PokemonIndex;
