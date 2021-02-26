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
    case 'setCanvasId':
        console.log("triggerd3 " + action.obj)
        return {
            ...state,
            canvasId: action.obj
        }
    default:
      return state;
  }
};

export default Reducer;
