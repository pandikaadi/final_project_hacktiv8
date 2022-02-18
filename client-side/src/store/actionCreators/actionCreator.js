import { SET_LOCATION, SET_SERVICE } from "../actionTypes/actionType";

export const setService = (payload) => {
  return {
    type: SET_SERVICE,
    payload,
  };
};

export const setLocation = (payload) => {
  return {
    type: SET_LOCATION,
    payload,
  };
};
