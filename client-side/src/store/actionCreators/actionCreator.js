import {
  SET_LOCATION,
  SET_SERVICE,
  SERVICE_SELECTED,
} from "../actionTypes/actionType";

export const setService = (payload) => {
  return {
    type: SET_SERVICE,
    payload,
  };
};

export const isServiceSelected = (payload) => {
  return {
    type: SERVICE_SELECTED,
    payload,
  };
};

export const setLocation = (payload) => {
  return {
    type: SET_LOCATION,
    payload,
  };
};
