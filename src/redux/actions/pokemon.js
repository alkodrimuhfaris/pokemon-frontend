import qs from 'qs';
import axios from 'axios';
import services, {backendService} from '../../Helpers/services';
import promiseResponse from './promiseResponse';

export default {
  getPokemon: (offset, limit, oldData = [], catchedData = []) => async (
    dispatch,
  ) => {
    dispatch({
      type: 'GET_DATA_POKEMON',
      payload: {
        ...promiseResponse.pending,
      },
    });
    const {data: axiosData} = await services().get(
      `/pokemon?${qs.stringify({offset, limit})}`,
    );
    const newData = [];
    oldData.forEach((x) => {
      newData.push(x);
    });
    try {
      const {results: rawData} = axiosData;
      const detailPokemonPromise = new Promise((resolve, reject) => {
        try {
          rawData.map(async (val) => {
            const {url, name} = val;
            const {data: pokeData} = await axios.get(url);
            const {
              abilities,
              sprites,
              moves,
              id,
              species,
              types,
              height,
              weight,
            } = pokeData;

            let catched = false;

            catchedData.forEach((val2) => {
              const {cathedID} = val2;
              if (cathedID === id) {
                catched = true;
              }
              return val2;
            });

            newData.push({
              name,
              id,
              weight: `${weight / 10} kg`,

              height: `${height * 10} cm`,

              types: types.map((val2) =>
                val2
                  ? val2.type
                    ? val2.type.name
                      ? val2.type.name
                      : null
                    : null
                  : null,
              ),

              species: species.name,

              moves: moves.map((val2) =>
                val2
                  ? val2.move
                    ? val2.move.name
                      ? val2.move.name
                      : null
                    : null
                  : null,
              ),

              abilities: abilities.map((val2) =>
                val2
                  ? val2.ability
                    ? val2.ability.name
                      ? val2.ability.name
                      : null
                    : null
                  : null,
              ),

              image: sprites
                ? sprites.other
                  ? sprites.other.dream_world
                    ? sprites.other.dream_world.front_default
                    : null
                  : null
                : null,
              nickname: '',
              catched,
            });
            return {
              id,
              name,
            };
          });
          resolve(newData);
          return newData;
        } catch (e) {
          reject(e);
          return null;
        }
      });

      detailPokemonPromise
        .then((data) =>
          dispatch({
            type: 'GET_DATA_POKEMON_SUCCESS',
            payload: {
              ...promiseResponse.success,
              data,
              offset: data.length,
              next: !!data.length,
            },
          }),
        )
        .catch(() => {
          dispatch({
            type: 'GET_DATA_POKEMON',
            payload: {
              ...promiseResponse.rejected,
            },
          });
        });
    } catch (e) {
      dispatch({
        type: 'GET_DATA_POKEMON',
        payload: {
          ...promiseResponse.rejected,
        },
      });
    }
  },
  getDetailPokemon: (selectedPokemon) => ({
    type: 'GET_DETAIL_POKEMON',
    payload: selectedPokemon,
  }),
  renamePokemon: ({name, timeChange, index}) => async (dispatch) => {
    dispatch({
      type: 'RENAME_POKEMON_PENDING',
      payload: {
        ...promiseResponse.pending,
      },
    });
    try {
      const {data: axiosData} = await backendService().post('/rename', {
        name,
        timeChange,
      });
      const {name: newName, timeChange: nextChange} = axiosData;
      dispatch({
        type: 'RENAME_POKEMON_SUCCESS',
        payload: {
          ...promiseResponse.success,
          index,
          name: newName,
          timeChange: nextChange,
        },
      });
      dispatch({
        type: 'RENAME_POKEMON_SUCCESS_DETAIL',
        payload: {
          ...promiseResponse.success,
          index,
          name: newName,
          timeChange: nextChange,
        },
      });
    } catch (e) {
      dispatch({
        type: 'RENAME_POKEMON_REJECTED',
        payload: {
          ...promiseResponse.rejected,
        },
      });
    }
  },
  catchPokemon: ({idx, val}) => async (dispatch) => {
    dispatch({
      type: 'CATCH_POKEMON_PENDING',
      payload: {
        ...promiseResponse.pending,
      },
    });
    try {
      const {data: axiosData} = await backendService().get('/catch');
      const {catched} = axiosData;
      dispatch({
        type: 'CATCH_POKEMON_SUCCESS',
        payload: {
          ...promiseResponse.success,
          ...val,
          catched,
        },
      });
      dispatch({
        type: 'CATCH_MAIN_POKEMON',
        payload: {
          ...promiseResponse.success,
          idx,
        },
      });
    } catch (e) {
      dispatch({
        type: 'CATCH_POKEMON',
        payload: {
          ...promiseResponse.rejected,
        },
      });
    }
  },
  releasePokemon: (idx) => async (dispatch) => {
    dispatch({
      type: 'RELEASE_POKEMON_PENDING',
      payload: {
        ...promiseResponse.pending,
      },
    });
    try {
      const {data: axiosData} = await backendService().get('/release');
      const {number, isPrime} = axiosData;
      dispatch({
        type: 'RELEASE_POKEMON_SUCCESS',
        payload: {
          ...promiseResponse.success,
          number,
          isPrime,
        },
      });
      dispatch({
        type: 'RELEASE_POKEMON_SUCCESS_MAIN',
        payload: {
          ...promiseResponse.success,
          number,
          isPrime: !isPrime,
          idx,
        },
      });
    } catch (e) {
      dispatch({
        type: 'RELEASE_POKEMON',
        payload: {
          ...promiseResponse.rejected,
        },
      });
    }
  },
};
