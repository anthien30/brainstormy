const Reducer = (state, action) => {
  switch (action.type) {
    case 'setObj':
      console.log('Triggered');
      return {
        ...state,
        googleObj: action.obj,
      };
    case 'setColorHexCode':
      console.log('Triggered');
      return {
        ...state,
        colorHexCode: action.obj,
      };
    default:
      return state;
  }
};

export default Reducer;
