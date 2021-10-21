import { GET_MAKES, GET_MODELS, SET_MAKE, SET_MODEL, GET_VEHICLES, SET_ERROR } from './types';

const loadMakes = (makes, state) => {
  return { ...state, makes: makes };
};

const loadModels = (models, state) => {
  return { ...state, models: models };
};

const setSelectedMake = (make, state) => {
  return { ...state, selectedMake: make };
};

const setSelectedModel = (model, state) => {
  return { ...state, selectedModel: model };
};

const loadVehicles = (vehicles, state) => {
  return { ...state, vehicles: vehicles };
};

const setError = (error, state) => {
  return { ...state, error: error };
};

export const rootReducer = (state, action) => {
  switch (action.type) {
    case GET_MAKES:
      return loadMakes(action.makes, state);
    case GET_MODELS:
      return loadModels(action.models, state);
    case SET_MAKE:
      return setSelectedMake(action.selectedMake, state);
    case SET_MODEL:
      return setSelectedModel(action.selectedModel, state);
    case GET_VEHICLES:
      return loadVehicles(action.vehicles, state);
    case SET_ERROR:
      return setError(action.error, state);
    default:
      return state;
  }
};
