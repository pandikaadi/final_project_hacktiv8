import {
  SET_REGISTER_BARBER,
  SET_REGISTER_ADMIN,
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
        console.log(err, ">>>>>>>>>error");
      });
  };
};

export const adminLogin = (payload) => {
  return (dispatch) => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      return res
        .json()
        .then((data) => {
          if (res.ok) {
            console.log(data);
          } else {
            return Promise.reject(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
