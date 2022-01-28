import * as actionTypes from "./products_types";

export const addToCart = (productID) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: { id: productID },
    };
};

export const loadCurrentProduct = (product) => {
    return {
        type: actionTypes.LOAD_CURRENT_PRODUCT,
        payload: product,
    };
};
