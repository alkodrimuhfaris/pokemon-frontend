const initialState = {
  success: false,
  pending: false,
  error: false,

  id: null,
  data: [],
  offset: 0,
  limit: 12,

  next: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'GET_DATA_POKEMON': {
      const {payload} = action;
      return {
        ...state,
        ...payload,
      };
    }
    case 'GET_DATA_POKEMON_SUCCESS': {
      const {success, pending, error, data, next} = action.payload;
      return {
        ...state,
        success,
        pending,
        error,
        data: data.sort((a, b) => a.id - b.id),
        offset: data.length,
        next,
      };
    }
    case 'CATCH_MAIN_POKEMON': {
      const {idx} = action.payload;
      const {data} = state;
      data[idx].catched = true;
      return {
        ...state,
        data,
      };
    }
    case 'CHANGE_NICKNAME_MAIN': {
      const {idx, nickname} = action.payload;
      const {data} = state;
      data[idx].nickname = nickname;
      return {
        ...state,
        data,
      };
    }
    case 'RENAME_POKEMON_SUCCESS': {
      const {index, name: nickname, timeChange} = action.payload;
      const {data} = state;
      data[index].nickname = nickname;
      data[index].timeChange = timeChange;
      return {
        ...state,
        data,
      };
    }
    case 'RELEASE_POKEMON_SUCCESS_MAIN': {
      const {idx, isPrime} = action.payload;
      const {data} = state;
      data[idx].nickname = isPrime ? '' : state.nickname;
      data[idx].timeChange = isPrime ? 0 : state.timeChange;
      data[idx].catched = isPrime ? false : state.catched;
      return {
        ...state,
        data,
      };
    }
  }
};
