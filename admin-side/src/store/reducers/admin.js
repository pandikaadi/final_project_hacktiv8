import { SET_REGISTER_BARBER } from "../actionTypes/actionType";

const initialState = {
  registerBarber: false,
};

function adminReducer(state = initialState, action) {
  if (action.type === SET_REGISTER_BARBER) {
    return {
      ...state,
      registerBarber: action.payload,
    };
  } else {
    return state;
  }
}

export default adminReducer;
