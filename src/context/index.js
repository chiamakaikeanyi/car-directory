import React, { createContext, useReducer } from 'react';
import { rootReducer } from './reducers';

const initialState = {
  makes: [],
  models: [],
  vehicles: [],
  selectedMake: '',
  selectedModel: '',
  error: '',
  setSelectedMake: () => {},
  setSelectedModel: () => {},
  loadMakes: () => {},
  loadModels: () => {},
  loadVehicles: () => {},
  loadMakesFromCache: () => {}
};

const AppContext = createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
