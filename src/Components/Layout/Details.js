import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../redux/actions';
import ModalConfirm from '../ComponentLayout/ModalConfirm/ModalConfirm';
import ModalLoading from '../ComponentLayout/ModalLoading/ModalLoading';
import ModalRename from '../ComponentLayout/ModalRename/ModalRename';

export default function Details({history}) {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [openChamge, setOpenChange] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmProps, setConfirmProps] = React.useState({
    icon: 'error',
    content: 'Failed To Catch Pokemon',
    useOneBtn: true,
    confirm: () => setOpenChange(false),
    confirmTxt: 'close',
    title: 'Failed',
  });
  const {route} = useSelector((state) => state.routes);
  React.useEffect(() => {
    if (route !== '/get') {
      dispatch({type: 'CHANGE_ROUTE', payload: '/get'});
    }
  }, [route]);

  const {
    name,
    id,
    image,
    moves,
    types,
    height,
    weight,
    catched,
    stats,
    abilities,

    nickname,
    timeChange,

    pendingCatch,
    renamePending,
    successCatch,
    releasePending,
    releaseSuccess,
    isRelease,
    number,
  } = useSelector((state) => state.pokemonDetail);

  const clearNotif = () => {
    dispatch({type: 'CLEAR_NOTIF', payload: null});
  };

  React.useEffect(() => {
    if (name) {
      const newData = {
        Name: name,
        Moves: moves.join(', '),
        Nickname: nickname || '-',
        Types: types.join(', '),
        Height: height,
        Weight: weight,
        Catched: catched
          ? 'You Have This Pokemon!'
          : "You Haven't Catch This Pokemon Yet",
      };
      setData(Object.entries(newData));
    } else {
      history.push('/');
    }
  }, [name, nickname]);

  React.useEffect(() => {
    if (successCatch && catched) {
      setOpenChange(true);
    } else if (!successCatch && catched) {
      setOpenChange(false);
    } else if (successCatch && !catched) {
      setConfirmProps({
        icon: 'error',
        content: 'Failed To Catch Pokemon',
        useOneBtn: true,
        confirm: () => {
          setConfirmOpen(false);
          clearNotif();
        },
        confirmTxt: 'close',
        title: 'Failed',
      });
      setConfirmOpen(true);
    }
  }, [successCatch, catched]);

  React.useEffect(() => {
    if (releaseSuccess && !isRelease) {
      setConfirmProps({
        icon: 'error',
        content: `Number generated in API = ${number} and it's not prime number, failed to release pokemon`,
        useOneBtn: true,
        confirm: () => {
          setConfirmOpen(false);
          clearNotif();
        },
        confirmTxt: 'close',
        title: 'Failed',
      });
      setConfirmOpen(true);
    } else if (releaseSuccess && isRelease) {
      setConfirmProps({
        icon: 'success',
        content: `Number generated in API = ${number} and it's prime number, success to release pokemon`,
        useOneBtn: true,
        confirm: () => {
          setConfirmOpen(false);
          clearNotif();
        },
        confirmTxt: 'close',
        title: 'Success',
      });
      setConfirmOpen(true);
    }
  }, [isRelease, releaseSuccess]);

  return (
    <div className="details">
      <ModalLoading
        modalOpen={pendingCatch || renamePending || releasePending}
      />
      <ModalRename
        modalOpen={openChamge}
        submitNickname={(nn) => {
          const payload = {idx: id - 1, nickname: nn};
          dispatch({type: 'CHANGE_NICKNAME', payload});
          dispatch({type: 'CHANGE_NICKNAME_MAIN', payload});
          setOpenChange(false);
        }}
      />
      <ModalConfirm {...confirmProps} modalOpen={confirmOpen} />
      <div className="row">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center pb-2">
          <img src={image} alt={`pokemon-${name}`} />
        </div>
        <div className="col-12 col-md-8">
          {data.map((val, idx) => (
            <div key={idx} className="row">
              <div className="col-3">
                <span>{val[0]}:</span>
              </div>

              <div className="col-9">
                <span className="font-bold">{val[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 catch-btn-wrapper">
          <button
            onClick={() =>
              dispatch(
                catched
                  ? actions.pokemon.renamePokemon({
                      index: id - 1,
                      name: nickname,
                      timeChange,
                    })
                  : actions.pokemon.catchPokemon({
                      idx: id - 1,
                      val: {
                        name,
                        id,
                        image,
                        moves,
                        types,
                        height,
                        weight,
                        catched,
                        stats,
                        abilities,
                      },
                    }),
              )
            }
            className="catch"
            type="button"
          >
            {catched ? 'Rename' : 'Catch'}
          </button>
          {!catched ? null : (
            <button
              onClick={() => dispatch(actions.pokemon.releasePokemon(id - 1))}
              className="catch danger"
              type="button"
            >
              Release
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
