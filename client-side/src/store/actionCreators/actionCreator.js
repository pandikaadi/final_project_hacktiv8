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
  GET_SERVICES,
  GET_USER_ORDER,
  SET_LOADING,
  SET_ERROR,
  SET_VOTE,
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
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const PostVote = (payload) => {
  return (dispatch) => {
    console.log(payload);
    return axios({
      method: "POST",
      url: `${baseUrl}/votes`,
      data: payload,
      headers: { access_token: localStorage.getItem("access_token") },
    })
      .then((res) => {
        dispatch(GetOrders(localStorage.getItem("access_token")));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(hasOrder(false));
      });
  };
};

export const GetOrders = (payload) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${baseUrl}/orders`,
      headers: { access_token: payload },
    })
      .then((res) => {
        if (
          res.data.orders[res.data.orders.length - 1].statusBarber ===
            "Finished" &&
          res.data.orders[res.data.orders.length - 1].statusPayment === true
        ) {
          dispatch(hasOrder(true));
          dispatch(getUserOrder(res.data));
        }
        dispatch(getUserOrder(res.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
export const cancelOrder = (payload) => {
  console.log(payload);
  return (dispatch) => {
    return axios({
      method: "DELETE",
      url: `${baseUrl}/orders/${payload}`,
      headers: { access_token: localStorage.access_token },
    })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
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
        access_token: localStorage.access_token,
      },
      params: payload,
    })
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
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
        console.log(data);
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

export const GetAllService = (payload) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${baseUrl}/services`,
      data: payload,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchServices(res.data));
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
export const fetchLocation = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/coordinates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: payload.lat,
        long: payload.lng,
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

export const postNewOrder = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
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

export const fetchServices = (payload) => {
  return {
    type: GET_SERVICES,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload,
  };
};

export const getUserOrder = (payload) => {
  return {
    type: GET_USER_ORDER,
    payload,
  };
};
