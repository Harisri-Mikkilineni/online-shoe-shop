import { combineReducers } from "redux";
import productsReducer from "./products/products_reducer.js";

const rootReducer = combineReducers({
    productsList: productsReducer,
});

export default rootReducer;
