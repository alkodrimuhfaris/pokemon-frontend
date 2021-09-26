import qs from 'qs';
import axios from 'axios';
import services, {backendService} from '../../Helpers/services';
import promiseResponse from './promiseResponse';

export default {
  getPokemon: (offset, limit) => async (dispatch) => {
    dispatch({
      type: 'GET_DATA_POKEMON',
      payload: {
        ...promiseResponse.pending,
      },
    });
    const {data: axiosData} = await services().get(
      `/pokemon?${qs.stringify({offset, limit})}`,
    );
    try {
      const {results: rawData} = axiosData;
      const detailPokemonPromise = new Promise((resolve, reject) => {
        const newData = [];
        try {
          rawData.map(async (val) => {
            const {url, name} = val;

            const {data: pokeData} = await axios.get(url);

            const {id, species, types} = pokeData;

            const image = pokeData.sprites
              ? pokeData.sprites.other
                ? pokeData.sprites.other.dream_world
                  ? pokeData.sprites.other.dream_world.front_default
                  : null
                : null
              : null;
            const type = types.map((tps) =>
              tps
                ? tps.type
                  ? tps.type.name
                    ? tps.type.name
                    : null
                  : null
                : null,
            );
            newData.push({
              id,
              name,
              image,
              type: type.length ? type[0] : 'normal',
              species: species.name,
            });
            return {
              id,
              name,
              image,
              type: type.length ? type[0] : 'normal',
              species: species.name,
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
            type: 'GET_DATA_POKEMON',
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
  getDetailPokemon: (selectedID) => async (dispatch) => {
    dispatch({
      type: 'GET_DETAIL_POKEMON',
      payload: {
        ...promiseResponse.pending,
      },
    });
    try {
      const {data: axiosData} = await services().get(`/pokemon/${selectedID}`);
      const {
        abilities,
        sprites,
        moves,
        name,
        id,
        species,
        types,
        height,
        weight,
      } = axiosData;

      const data = {
        ...promiseResponse.success,

        name,
        id,

        weight: `${weight * 0.1} kg`,

        height: `${height * 10} cm`,

        types: types.map((val) =>
          val
            ? val.type
              ? val.type.name
                ? val.type.name
                : null
              : null
            : null,
        ),

        species: species.name,

        moves: moves.map((val) =>
          val
            ? val.move
              ? val.move.name
                ? val.move.name
                : null
              : null
            : null,
        ),

        abilities: abilities.map((val) =>
          val
            ? val.ability
              ? val.ability.name
                ? val.ability.name
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
      };
      dispatch({
        type: 'GET_DETAIL_POKEMON',
        payload: {
          ...promiseResponse.success,
          ...data,
        },
      });
    } catch (e) {
      dispatch({
        type: 'GET_DETAIL_POKEMON',
        payload: {
          ...promiseResponse.rejected,
        },
      });
    }
  },
  renamePokemon: ({name, timeChange, index}) => async (dispatch) => {
    dispatch({
      type: 'RENAME_POKEMON',
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
        type: 'RENAME_POKEMON',
        payload: {
          ...promiseResponse.success,
          index,
          name: newName,
          timeChange: nextChange,
        },
      });
    } catch (e) {
      dispatch({
        type: 'RENAME_POKEMON',
        payload: {
          ...promiseResponse.rejected,
        },
      });
    }
  },
  catchPokemon: () => async (dispatch) => {
    dispatch({
      type: 'CATCH_POKEMON',
      payload: {
        ...promiseResponse.pending,
      },
    });
    try {
      const {data: axiosData} = await backendService().get('/catch');
      const {catched} = axiosData;
      dispatch({
        type: 'CATCH_POKEMON',
        payload: {
          ...promiseResponse.success,
          catched,
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
  releaePokemon: () => async (dispatch) => {
    dispatch({
      type: 'RELEASE_POKEMON',
      payload: {
        ...promiseResponse.pending,
      },
    });
    try {
      const {data: axiosData} = await backendService().get('/release');
      const {number, isPrime} = axiosData;
      dispatch({
        type: 'RELEASE_POKEMON',
        payload: {
          ...promiseResponse.success,
          number,
          isPrime,
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
