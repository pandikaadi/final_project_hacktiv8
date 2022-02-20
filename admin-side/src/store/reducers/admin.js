import {
  SET_REGISTER_BARBER,
  SET_REGISTER_ADMIN,
} from "../actionTypes/actionType";

const initialState = {
  registerBarber: false,
  registerAdmin: false,
};

function adminReducer(state = initialState, action) {
  if (action.type === SET_REGISTER_BARBER) {
    return {
      ...state,
      registerBarber: action.payload,
    };
  } else if (action.type === SET_REGISTER_ADMIN) {
    return {
      ...state,
      registerAdmin: action.payload,
    };
  } else {
    return state;
  }
}

export default adminReducer;
