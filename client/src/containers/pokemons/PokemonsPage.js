import React from 'react';
import PokemonsIndex from '../../components/pokemons/PokemonsIndex';
import { connect } from 'react-redux';
import { getPokemonsRequest,getPokemonDetailsRequest,addPokemonToFavouritesRequest,getFavouritesRequest } from '../../actions/pokemonActions';
import PropTypes from 'prop-types';

class PokemonsPage extends React.Component {
  render() {
    const { getPokemonsRequest,getPokemonDetailsRequest,addPokemonToFavouritesRequest,getFavouritesRequest } = this.props;
    return (
      <div className="container-fluid">
        <PokemonsIndex
          getPokemonsRequest={getPokemonsRequest}
          getPokemonDetailsRequest={getPokemonDetailsRequest}
          addPokemonToFavouritesRequest={addPokemonToFavouritesRequest}
          getFavouritesRequest={getFavouritesRequest}
          />
      </div>
    );
  }
}

PokemonsPage.propTypes = {
  getPokemonsRequest: PropTypes.func.isRequired,
  getPokemonDetailsRequest: PropTypes.func.isRequired,
  addPokemonToFavouritesRequest:PropTypes.func.isRequired,
  getFavouritesRequest:PropTypes.func.isRequired
}


export default connect(null, { getPokemonsRequest,getPokemonDetailsRequest,addPokemonToFavouritesRequest,getFavouritesRequest})(PokemonsPage);
