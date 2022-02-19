import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import clientReducer from "./reducers/client";
import dataReducer from "./reducers/data";

const rootReducer = combineReducers({
  client: clientReducer,
  data: dataReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
