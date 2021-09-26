import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import actions from '../../redux/actions';

export default function PokeCard({val}) {
  const dispatch = useDispatch();
  const {route} = useSelector((state) => state.routes);
  const {id, name, types, image, nickname, catched} = val;
  return (
    <div className={`card ${catched ? 'catched' : ''}`}>
      <img className="poke-img" src={image} alt={`artwork-${name}`} />
      <div className="body-card">
        <p>
          Name: <span>{name}</span>
        </p>
        {route === '/my-collections' ? (
          <p>
            Nickname: <span>{nickname}</span>
          </p>
        ) : null}
        <p>
          Type: <span>{types[0]}</span>
        </p>
        <div className="detail-wrapper">
          <Link
            className="detail-btn"
            to={`/get/${id}`}
            onClick={() => dispatch(actions.pokemon.getDetailPokemon(val))}
          >
            <span>Detail</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
