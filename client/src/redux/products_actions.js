import * as actionTypes from "./products_types";

export const loadProducts = (products) => {
    return {
        type: actionTypes.LOAD_PRODUCTS,
        payload: { products },
    };
};

export const loadCurrentProduct = (product) => {
    return {
        type: actionTypes.LOAD_CURRENT_PRODUCT,
        payload: product,
    };
};

export const addToCart = (itemID) => {
    console.log("item id:", itemID);
    console.log("action types:", actionTypes);
    return {
        type: actionTypes.ADD_TO_CART,
        payload: { id: itemID },
    };
};

export const deleteFromCart = (itemID) => {
    return {
        type: actionTypes.DELETE_FROM_CART,
        payload: { id: itemID },
    };
};

export const adjustQty = (itemID, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: itemID,
            qty: value,
        },
    };
};
