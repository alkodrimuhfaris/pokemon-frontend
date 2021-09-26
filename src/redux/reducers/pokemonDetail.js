const initialState = {
  success: false,
  pending: false,
  error: false,

  successCatch: false,
  pendingCatch: false,
  errorCatch: false,

  renamePending: false,

  releasePending: false,
  releaseSuccess: false,

  savedPokemon: [],

  image: '',
  id: 0,
  name: '',
  type: '',
  move: '',
  height: '',
  weight: '',
  catched: false,
  stats: [],
  abilities: [],

  nickname: '',
  timeChange: 0,
  isRelease: false,
  number: 0,
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
    case 'CATCH_POKEMON_PENDING': {
      return {
        ...state,
        successCatch: false,
        pendingCatch: true,
        errorCatch: false,
      };
    }
    case 'CATCH_POKEMON_SUCCESS': {
      const {catched} = action.payload;
      return {
        ...state,
        successCatch: true,
        pendingCatch: false,
        errorCatch: false,
        catched,
      };
    }
    case 'CATCH_POKEMON_REJECTED': {
      return {
        ...state,
        successCatch: false,
        pendingCatch: false,
        errorCatch: true,
      };
    }
    case 'CHANGE_NICKNAME': {
      return {
        ...state,
        successCatch: false,
        pendingCatch: false,
        errorCatch: false,
        nickname: action.payload.nickname,
      };
    }
    case 'RENAME_POKEMON_PENDING': {
      return {
        ...state,
        renamePending: true,
      };
    }
    case 'RENAME_POKEMON_SUCCESS_DETAIL': {
      const {name: nickname, timeChange} = action.payload;
      return {
        ...state,
        renamePending: false,
        nickname,
        timeChange,
      };
    }
    case 'RELEASE_POKEMON_PENDING': {
      return {
        ...state,
        releasePending: true,
        releaseSuccess: false,
      };
    }
    case 'RELEASE_POKEMON_SUCCESS': {
      const {isPrime, number} = action.payload;
      return {
        ...state,
        releasePending: false,
        releaseSuccess: true,
        number,
        isRelease: isPrime,
        nickname: isPrime ? '' : state.nickname,
        catched: isPrime ? '' : state.catched,
      };
    }
    case 'CLEAR_NOTIF': {
      return {
        ...state,
        successCatch: false,
        pendingCatch: false,
        errorCatch: false,

        renamePending: false,

        releasePending: false,
        releaseSuccess: false,
      };
    }
  }
};
