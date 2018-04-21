import { combineReducers } from "redux";
import UserReducer from "./reducerUsers";
import activeUserReducer from './reducer-active-user'
const allReducer = combineReducers({
      users: UserReducer, /* every reducer is a small piece of data */
      activeUser: activeUserReducer
});

export default allReducer;