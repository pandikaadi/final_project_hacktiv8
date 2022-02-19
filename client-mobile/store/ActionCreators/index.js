import AsyncStorage from '@react-native-async-storage/async-storage';

export const doLogin = (payload) => {
  return dispatch => {
    return fetch(`http://localhost:4000/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    })
      .then(response => {

        if (response.ok) {
          return response.json()
        }
        else {
          return response.json().then((err) => {
            return Promise.reject(err)
          })
        }
      })
      .then(data => {
        AsyncStorage.setItem('@storage_Key', data.access_token)
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}