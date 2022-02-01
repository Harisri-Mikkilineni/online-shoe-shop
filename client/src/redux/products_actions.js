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

export const removeFromCart = (itemID) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
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

export const incrementQty = (itemID, value) => {
    return {
        type: actionTypes.INCREMENT_QTY,
        payload: {
            id: itemID,
            qty: value,
        },
    };
};

export const decrementQty = (itemID, value) => {
    return {
        type: actionTypes.DECREMENT_QTY,
        payload: {
            id: itemID,
            qty: value,
        },
    };
};
