const initialState = {
  success: false,
  pending: false,
  error: false,

  id: null,
  data: [],
  offset: 0,
  limit: 10,

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
  }
};
