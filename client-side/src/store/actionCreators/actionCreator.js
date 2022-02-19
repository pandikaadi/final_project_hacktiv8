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
  GET_BARBER,
} from "../actionTypes/actionType";
const baseUrl = "http://localhost:4000";

export const CreateNewClient = (payload) => {
  return (dispatch) => {
    return axios({
      method: "POST",
      url: `${baseUrl}/users`,
      data: payload,
    });
  };
};

export const GetBarberData = (payload) => {
  return (dispatch) => {
    return axios({
      method: "GET",
      url: `${baseUrl}/barbers`,
      data: payload,
    })
      .then((res) => {
        dispatch(fetchBarber(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTodayBooks = (payload) => {
  return (dispatch) => {
    return axios({
      method: "GET",
      url: `${baseUrl}/dailyOrders`,
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      params: payload,
    })
      .then((res) => {
        return res.data.orders
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

export const doLogin = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          return result.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return result.json();
      })
      .then((data) => {
        localStorage.access_token = data.access_token;
        localStorage.role = data.role;
        return data;
      })
      .catch((err) => {
        throw err;
      });
    // .finally(() => {
    //   dispatch(fetchUserLoading(false));
    // });
  };
};

export const fetchLocation = (payload) => {
  return dispatch => {
    return fetch(`${baseUrl}/coordinates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: payload.lat,
        long: payload.lng,
      
      })
    })
      .then((result) => {
        if (!result.ok) {
          return result.json().then((err) => {throw new Error(err.message)});
        }
        return result.json();
      })
      .then((data) => {
        return data
      })
      .catch((err) => {
        throw err
      })
      // .finally(() => {
      //   dispatch(fetchUserLoading(false));
      // });
    }
}

export const postNewOrder = (payload) => {
  return dispatch => {
    return fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token
      },
      body: JSON.stringify(payload)
    })
      .then((result) => {
        if (!result.ok) {
          return result.json().then((err) => {throw new Error(err.message)});
        }
        return result.json();
      })
      .then((data) => {
        console.log(data, `>>>>>>>>>>`);
        return data
      })
      .catch((err) => {
        throw err
      })
      // .finally(() => {
      //   dispatch(fetchUserLoading(false));
      // });
    }
}

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

export const fetchBarber = (payload) => {
  return {
    type: GET_BARBER,
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
