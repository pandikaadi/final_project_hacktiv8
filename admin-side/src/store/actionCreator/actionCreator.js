import {
  SET_REGISTER_BARBER,
  SET_REGISTER_ADMIN,
  FETCH_CHARTDATA,
  SET_LOADING,
  SET_ERROR,
} from "../actionTypes/actionType";

export const postBarber = (payload) => {
  return (dispatch) => {
    return fetch("http://localhost:4000/barbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (res.ok) {
            dispatch(setRegister(false));
          } else {
            return Promise.reject(data);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchBarber = (payload, act) => {
  console.log(act);
  return (dispatch) => {
    fetch("http://localhost:4000/admin/all", {
      method: "GET",
      headers: { access_token: payload },
    })
      .then((res) => {
        return res.json().then((data) => {
          if (res.ok) {
            dispatch(fetchChartData(data));
          } else {
            return Promise.reject(data);
          }
        });
      })
      .catch((err) => {
        dispatch(setError(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const postAdmin = (payload) => {
  return (dispatch) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (res.ok) {
            dispatch(setRegisterAdmin(false));
          } else {
            return Promise.reject(data);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const adminLogin = (payload) => {
  return (dispatch) => {
    return fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };
};

export const setRegister = (payload) => {
  return {
    type: SET_REGISTER_BARBER,
    payload,
  };
};

export const setRegisterAdmin = (payload) => {
  return {
    type: SET_REGISTER_ADMIN,
    payload,
  };
};

export const fetchChartData = (payload) => {
  return {
    type: FETCH_CHARTDATA,
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
