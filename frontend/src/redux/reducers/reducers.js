import { combineReducers } from "redux";
import customer from "./customerReducer";
import product from "./productReducer";
import auth from "./authReducer";

const reducers = combineReducers({
  auth,
  customer,
  product,
});

export default reducers;
