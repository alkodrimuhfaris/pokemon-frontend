import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions';

export default function Main() {
  const dispatch = useDispatch();
  const {data: pokeData, offset, limit} = useSelector((state) => state.pokemon);
  const {savedPokemon} = useSelector((state) => state.pokemonDetail);

  React.useEffect(() => {
    if (!pokeData.length) {
      dispatch(actions.pokemon.getPokemon(offset, limit, savedPokemon));
      dispatch(actions.pokemon.getDetailPokemon(1));
      dispatch(
        actions.pokemon.renamePokemon({
          index: 0,
          name: 'Syamsul bahari',
          timeChange: 10,
        }),
      );
    } else {
      dispatch(actions.pokemon.catchPokemon({idx: 0, val: pokeData[0]}));
      dispatch(actions.pokemon.releaePokemon());
    }
  }, []);

  return <div>main page</div>;
}
