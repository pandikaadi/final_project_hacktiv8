import {
  SET_SERVICE,
  SET_LOCATION,
  SET_BARBER,
  SHOW_RATINGFORM,
  SET_RATING,
  GET_BARBER,
  GET_SERVICES,
} from "../actionTypes/actionType";

const initialState = {
  location: "",
  service: 0,
  servicePrice: null,
  barber: 0,
  showRating: false,
  rating: 0,
  barberDatas: [],
  serviceDatas: [],
};

function dataReducer(state = initialState, action) {
  if (action.type === SET_LOCATION) {
    return {
      ...state,
      location: action.payload,
    };
  } else if (action.type === SET_SERVICE) {
    console.log(action.payload, `>>>>>ACTIONPAYLOAD`);
    return {
      ...state,
      service: action.payload.id,
      servicePrice: action.payload.price
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
  } else if (action.type === GET_BARBER) {
    return {
      ...state,
      barberDatas: action.payload,
    };
  } else if (action.type === GET_SERVICES) {
    return {
      ...state,
      serviceDatas: action.payload,
    };
  } else {
    return state;
  }
}

export default dataReducer;
