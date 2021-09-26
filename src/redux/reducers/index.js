import {combineReducers} from 'redux';
import routes from './routes';
import pokemon from './pokemon';
import pokemonDetail from './pokemonDetail';

export default combineReducers({
  pokemon,
  pokemonDetail,
  routes,
});
