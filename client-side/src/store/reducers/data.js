import {
  SET_SERVICE,
  SET_LOCATION,
  SET_BARBER,
  SHOW_RATINGFORM,
  SET_RATING,
} from "../actionTypes/actionType";

const initialState = {
  location: "",
  service: 0,
  barber: 0,
  showRating: false,
  rating: 0,
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
  } else if (action.type === SET_BARBER) {
    return {
      ...state,
      barber: action.payload,
    };
  } else if (action.type === SHOW_RATINGFORM) {
    return {
      ...state,
      showRating: action.payload,
    };
  } else if (action.type === SET_RATING) {
    return {
      ...state,
      rating: action.payload,
    };
  } else {
    return state;
  }
}

export default dataReducer;
