import { SERVICE_SELECTED } from "../actionTypes/actionType";

const initialState = {
  isService: false,
};

function clientReducer(state = initialState, action) {
  if (action.type === SERVICE_SELECTED) {
    return {
      ...state,
      isService: action.payload,
    };
  } else {
    return state;
  }
}

export default clientReducer;
