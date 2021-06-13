import { createStore } from "redux";
import combinedReducers from "./combinedReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(combinedReducers, composeWithDevTools());

export default store;
