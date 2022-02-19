import axios from "axios";
import {
  SET_LOCATION,
  SET_SERVICE,
  SERVICE_SELECTED,
  SET_BARBER,
  SHOW_RATINGFORM,
  SET_RATING,
  CLIENT_HASORDER,
  SHOW_ORDERDETAIL,
} from "../actionTypes/actionType";
const url = "http://localhost:/4000/";

export const CreateNewClient = (payload) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://localhost:4000/users",
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setService = (payload) => {
  return {
    type: SET_SERVICE,
    payload,
  };
};

export const hasOrder = (payload) => {
  return {
    type: CLIENT_HASORDER,
    payload,
  };
};

export const showTheDetail = (payload) => {
  return {
    type: SHOW_ORDERDETAIL,
    payload,
  };
};

export const showRatingForm = (payload) => {
  return {
    type: SHOW_RATINGFORM,
    payload,
  };
};

export const setRatingStar = (payload) => {
  return {
    type: SET_RATING,
    payload,
  };
};

export const isServiceSelected = (payload) => {
  return {
    type: SERVICE_SELECTED,
    payload,
  };
};

export const setLocation = (payload) => {
  return {
    type: SET_LOCATION,
    payload,
  };
};

export const setBarber = (payload) => {
  return {
    type: SET_BARBER,
    payload,
  };
};
