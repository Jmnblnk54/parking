const initState = {
  userData: {
    userId: '',
    type: '',
  },
 
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userData: action.payload.userData,
      };
    

    default:
      return state;
  }
};
