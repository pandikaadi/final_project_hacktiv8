import { SERVICE_SELECTED, CLIENT_HASORDER } from "../actionTypes/actionType";

const initialState = {
  isService: false,
  hasOrder: false,
};

function clientReducer(state = initialState, action) {
  if (action.type === SERVICE_SELECTED) {
    return {
      ...state,
      isService: action.payload,
    };
  } else if (action.type === CLIENT_HASORDER) {
    return {
      ...state,
      hasOrder: action.payload,
    };
  } else {
    return state;
  }
}

export default clientReducer;
