import * as actionTypes from "./actionTypes";
import { message } from "antd";

const setLoading = (action) => ({
  type: actionTypes.SET_LOADING,
  action,
});

export const authenticate = (user, token) => {
  if (typeof Storage !== "undefined" && token) {
    localStorage.setItem("token", token);
  }

  return {
    type: actionTypes.AUTHENTICATE,
    user,
  };
};

export const signinGoogle = (googleRs) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN_API + "auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: googleRs.profileObj.name,
            email: googleRs.profileObj.email,
            avatar: googleRs.profileObj.imageUrl,
          }),
        }
      );

      const data = await response.json();
      if (data.error) {
        message.error("Error: " + data.error.message);
        dispatch(setLoading(false));
        return;
      }
      dispatch(authenticate(data, data.token));
      dispatch(setLoading(false));
      dispatch(setModalVisibility(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
};

export const signinCredentials = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN_API + "auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (data.error) {
        message.error("Error: " + data.error.message);
        dispatch(setLoading(false));
        return;
      }
      dispatch(authenticate(data, data.token));
      dispatch(setLoading(false));
      dispatch(setModalVisibility(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
};

export const signupCredentials = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        process.env.NEXT_PUBLIC_DOMAIN_API + "auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();
      if (data.error) {
        message.error("Error: " + data.error.message);
        dispatch(setLoading(false));
        return;
      }
      dispatch(authenticate(data, data.token));
      dispatch(setLoading(false));
      dispatch(setModalVisibility(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
};

export const logOut = () => {
  if (typeof Storage !== "undefined") {
    localStorage.removeItem("token");
  }

  return {
    type: actionTypes.LOGOUT,
  };
};

export const setModalVisibility = (action) => ({
  type: actionTypes.SET_MODAL_VISIBILITY,
  action,
});
