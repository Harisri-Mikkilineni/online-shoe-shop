import * as actionTypes from "./products_types";

const INITIAL_STATE = {
    products: [], //{id,name,description,image,price}
    currentProduct: null,
};

const productsReducer = (state = INITIAL_STATE, action) => {
    if (action.type == actionTypes.ADD_TO_CART) {
        return {};
    } else if (action.type == actionTypes.LOAD_CURRENT_PRODUCT) {
        return {};
    } else {
        return state;
    }
};

export default productsReducer;
