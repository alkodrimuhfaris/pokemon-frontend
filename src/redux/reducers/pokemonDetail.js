import actions from '../actions';

const initialState = {
  success: false,
  pending: false,
  error: false,

  savedPokemon: [],

  image: '',
  id: 0,
  bio: '',
  name: '',
  type: '',
  move: '',
  height: '',
  weight: '',
  stats: [],
  abilities: [],

  nickname: '',
  timeChange: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_DETAIL_POKEMON': {
      const {payload} = action;

      return {
        ...state,
        ...payload,
      };
    }
    case 'CATCH_POKEMON': {
      const {success} = action.payload;
      if (success) {
        const {catched} = action.payload;
        return {
          ...state,
          ...action.payload,
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'RENAME_POKEMON': {
      const {success} = action.payload;
      if (success) {
        const {index, name, timeChange} = action.payload;
        return {
          ...state,
          ...action.payload,
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'RELEASE_POKEMON': {
      const {success} = action.payload;
      if (success) {
        const {number, isPrime} = action.payload;
        return {
          ...state,
          ...action.payload,
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    }
  }
};
