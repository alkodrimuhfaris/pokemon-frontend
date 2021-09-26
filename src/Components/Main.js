import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import actions from '../redux/actions';

export default function Main() {
  const dispatch = useDispatch();
  const {data: pokeData, offset, limit} = useSelector((state) => state.pokemon);

  React.useEffect(() => {
    if (!pokeData.length) {
      dispatch(actions.pokemon.getPokemon(offset, limit));
      dispatch(actions.pokemon.getDetailPokemon(1));
      dispatch(
        actions.pokemon.renamePokemon({
          index: 0,
          name: 'Syamsul bahari',
          timeChange: 10,
        }),
      );
      dispatch(actions.pokemon.catchPokemon());
      dispatch(actions.pokemon.releaePokemon());
    }
  }, []);

  return <div>main page</div>;
}
