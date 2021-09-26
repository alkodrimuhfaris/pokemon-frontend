const initialState = {
  route: '/',
};

export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
    case 'CHANGE_ROUTE': {
      return {
        route: action.payload,
      };
    }
  }
};
