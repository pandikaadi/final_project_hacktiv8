import { SET_REGISTER_BARBER } from "../actionTypes/actionType";

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

export const setRegister = (payload) => {
  return {
    type: SET_REGISTER_BARBER,
    payload,
  };
};
