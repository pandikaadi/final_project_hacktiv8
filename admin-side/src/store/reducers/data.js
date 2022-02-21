import { FETCH_CHARTDATA } from "../actionTypes/actionType";

const initialState = {
  chartData: {},
};

function dataReducer(state = initialState, action) {
  if (action.type === FETCH_CHARTDATA) {
    return {
      ...state,
      chartData: action.payload,
    };
  }
  return state;
}

export default dataReducer;
