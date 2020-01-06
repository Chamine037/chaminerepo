import axios from 'axios'

export const signIn = (credentials) => {
  return (dispatch) => {
    dispatch({ type: 'LOGGING_IN' });
    axios.post("https://10.9.10.37:3000/clientes/login", credentials
    ).then((response) => {
      console.log("Response: ", response);
      dispatch({ type: 'LOGIN_SUCCESS', id: response.data.id, isAdmin: response.data.isAdmin });
    }).catch((err) => {
      window.alert("Login Fail\nEmail ou password errado")
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: 'SIGNOUT_SUCCESS' });
  }
}