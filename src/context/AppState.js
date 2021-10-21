import React, { useReducer } from 'react';
import { AppContext } from './index';
import { rootReducer } from './reducers';
import { GET_MAKES, GET_MODELS, SET_MAKE, SET_MODEL, GET_VEHICLES, SET_ERROR } from './types';
import { BASE_URL } from '../constants';

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, {
    makes: [],
    models: [],
    vehicles: [],
    selectedMake: '',
    selectedModel: '',
    error: ''
  });

  const loadMakesFromCache = makes => {
    dispatch({ type: GET_MAKES, makes: makes });
  };

  const loadMakes = () => {
    fetch(`${BASE_URL}/makes`)
      .then(response => {
        if (!response.ok) {
          throw Error('An error occured while fetching the make. Please try again');
        }
        return response?.json();
      })
      .then(data => {
        dispatch({ type: GET_MAKES, makes: data });
        window.localStorage.setItem('makes', JSON.stringify(data));
        dispatch({ type: SET_ERROR, error: null });
      })
      .catch(err => {
        dispatch({ type: SET_ERROR, error: err.message });
      });
  };

  const loadModels = make => {
    fetch(`${BASE_URL}/models?make=${make}`)
      .then(response => {
        if (!response.ok) {
          throw Error('An error occured while fetching the models. Please try again');
        }
        return response?.json();
      })
      .then(data => {
        dispatch({ type: GET_MODELS, models: data });
        dispatch({ type: SET_ERROR, error: null });
      })
      .catch(err => {
        dispatch({ type: SET_ERROR, error: err.message });
      });
  };

  const setSelectedMake = make => {
    dispatch({ type: SET_MAKE, selectedMake: make });
  };

  const setSelectedModel = model => {
    dispatch({ type: SET_MODEL, selectedModel: model });
  };

  const loadVehicles = (make, model) => {
    fetch(`${BASE_URL}/vehicles?make=${make}&model=${model}`)
      .then(response => {
        if (!response.ok) {
          throw Error('An error occured while fetching the vehicles. Please try again');
        }
        return response?.json();
      })
      .then(data => {
        dispatch({ type: GET_VEHICLES, vehicles: data });
        dispatch({ type: SET_ERROR, error: null });
      })
      .catch(err => {
        dispatch({ type: SET_ERROR, error: err.message });
      });
  };

  return (
    <AppContext.Provider
      value={{
        makes: state.makes,
        models: state.models,
        vehicles: state.vehicles,
        selectedMake: state.selectedMake,
        selectedModel: state.selectedModel,
        error: state.error,
        loadMakes: loadMakes,
        loadModels: loadModels,
        setSelectedMake: setSelectedMake,
        setSelectedModel: setSelectedModel,
        loadVehicles: loadVehicles,
        loadMakesFromCache: loadMakesFromCache
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
