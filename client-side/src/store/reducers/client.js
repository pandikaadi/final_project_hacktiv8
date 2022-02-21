import {
  SERVICE_SELECTED,
  CLIENT_HASORDER,
  SHOW_ORDERDETAIL,
  SET_LOADING,
  SET_ERROR,
} from "../actionTypes/actionType";

const initialState = {
  isService: false,
  hasOrder: false,
  showDetail: true,
  loading: true,
  error: null,
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
  } else if (action.type === SHOW_ORDERDETAIL) {
    return {
      ...state,
      showDetail: action.payload,
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

export default clientReducer;
