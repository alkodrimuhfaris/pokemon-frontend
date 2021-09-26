import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../redux/actions';
import PokeCard from '../ComponentLayout/PokeCard';

export default function MyCollections() {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const {data: newData, limit, success, pending} = useSelector(
    (state) => state.pokemon,
  );
  const {savedPokemon} = useSelector((state) => state.pokemonDetail);

  React.useEffect(() => {
    if (!newData.length)
      dispatch(
        actions.pokemon.getPokemon(data.length, limit, data, savedPokemon),
      );
  }, []);

  React.useEffect(() => {
    setData(newData);
  }, [success, pending]);

  return (
    <div className="row poke-list">
      {data.filter((poke) => poke.catched).length ? (
        data
          .filter((poke) => poke.catched)
          .map((val, idx) => (
            <div key={idx} className="col-6 col-md-3 col-lg-2 col card-wrapper">
              <PokeCard idx={idx} val={val} />
            </div>
          ))
      ) : (
        <p className="text-center py-3">
          Ups kamu tidak punya koleksi pokemon! Ayo tangkap pokemon dan rasakan
          keseruannya!
        </p>
      )}
    </div>
  );
}
