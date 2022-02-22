import {
  SET_REGISTER_BARBER,
  SET_REGISTER_ADMIN,
  SET_LOADING,
  SET_ERROR,
} from "../actionTypes/actionType";

const initialState = {
  registerBarber: false,
  registerAdmin: false,
  loading: true,
  error: 0,
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
  } else if (action.type === SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
    };
  } else if (action.type === SET_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  } else {
    return state;
  }
}

export default adminReducer;
