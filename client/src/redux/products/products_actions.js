import * as actionTypes from "./products_types";

export const addToCart = (id) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: { id },
    };
};

export const loadCurrentProduct = (product) => {
    return {
        type: actionTypes.LOAD_CURRENT_PRODUCT,
        payload: product,
    };
};

export const changeModal = (payload) => {
    return {
        type: actionTypes.CHANGE_MODAL,
        payload,
    };
};
