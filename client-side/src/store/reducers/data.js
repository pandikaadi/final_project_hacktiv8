import { SET_SERVICE, SET_LOCATION } from "../actionTypes/actionType";

const initialState = {
  location: "",
  service: 0,
};

function dataReducer(state = initialState, action) {
  if (action.type === SET_LOCATION) {
    return {
      ...state,
      location: action.payload,
    };
  } else if (action.type === SET_SERVICE) {
    return {
      ...state,
      service: action.payload,
    };
  } else {
    return state;
  }
}

export default dataReducer;
