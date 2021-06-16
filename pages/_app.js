import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/sideMenu.scss";
import "antd/dist/antd.css";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider, useDispatch } from "react-redux";
import thunk from "redux-thunk";
import sideMenuReducer from "../store/reducers/sideMenu";
import authReducer from "../store/reducers/auth";
import { authenticate } from "../store/actions/index";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxAccess>
      <Component {...pageProps} />
    </ReduxAccess>
  );
}

export default wrapper.withRedux(MyApp);

const ReduxAccess = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_API}user?secret_token=${token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (data.error) {
            return;
          }
          dispatch(authenticate(data));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return children;
};
