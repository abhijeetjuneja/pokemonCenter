import axios from 'axios';

export function getPokemonsRequest(offset,limit) {
  return dispatch => {
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset);
  }
}

export function getPokemonDetailsRequest(index) {
  return dispatch => {
    var index1 = index + 1;
    return axios.get('https://pokeapi.co/api/v2/pokemon/'+index1);
  }
}

export function addPokemonToFavouritesRequest(id) {
  return dispatch => {
    var index = id + 1;
    return axios.post('/api/pokemons/add/'+index);
  }
}

export function getFavouritesRequest() {
  return dispatch => {
    return axios.get('/api/pokemons/favourites');
  }
}
