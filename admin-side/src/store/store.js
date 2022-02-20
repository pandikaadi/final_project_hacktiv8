import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import adminReducer from "./reducers/admin";
import dataReducer from "./reducers/data";

const rootReducer = combineReducers({
  admin: adminReducer,
  data: dataReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
