import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "../store/reducers/auth";
import sideMenuReducer from "../store/reducers/sideMenu";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({
  menu: sideMenuReducer,
  auth: authReducer,
});

const makeStore = () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore);
