import React, { createContext, useReducer } from 'react';
import Reducer from './Reducer';

//Contains the global state store for google object
const initialState = {
  googleObj: {},
  colorHexCode: '#000000',
  canvasId: 0
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
