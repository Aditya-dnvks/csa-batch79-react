import { createStore } from "redux";
import counteReducer from "./reducer";

const store = createStore(counteReducer);

export default store;
