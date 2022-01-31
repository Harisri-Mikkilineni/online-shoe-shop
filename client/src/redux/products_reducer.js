import * as actionTypes from "./products_types";

const INITIAL_STATE = {
    products: [], //{id,name,description,image,price}
    cart: [], //{id,name,description,image,price,qty}
    currentProduct: null,
};

const productsReducer = (state = INITIAL_STATE, action) => {
    console.log("action in reducer:", action);
    if (action.type === actionTypes.LOAD_PRODUCTS) {
        console.log("action.payload:", action.payload);
        console.log("state :", state);
        return {
            ...state,
            products: action.payload.products,
        };
    } else if (action.type === actionTypes.LOAD_CURRENT_PRODUCT) {
        console.log("action payload:", action.payload);
        return {
            ...state,
            currentProduct: action.payload,
        };
    } else if (action.type === actionTypes.ADD_TO_CART) {
        //get items from products array
        const prod = state.products.find(
            (item) => item.id === action.payload.id
        );

        console.log("prod in reducer:", prod);
        //code to add product to state
        const inCart = state.cart.find((prod) =>
            prod.id === action.payload.id ? true : false
        );
        return {
            ...state,
            cart: inCart
                ? state.cart.map((prod) =>
                      prod.id === action.payload.id
                          ? { ...prod, qty: prod.qty + 1 }
                          : prod
                  )
                : [...state.cart, { ...prod, qty: 1 }],
            //return it and access
        };
    } else if (action.type === actionTypes.DELETE_FROM_CART) {
        //check if item is already in cart
        return {
            ...state,
            cart: state.cart.filter((prod) => prod.id != action.payload.id),
        };
    } else if (action.type === actionTypes.ADJUST_QTY) {
        return {
            ...state,
            cart: state.cart.map((prod) =>
                prod.id === action.payload.id
                    ? { ...prod, qty: action.payload.qty }
                    : prod
            ),
        };
    } else {
        return state;
    }
};

export default productsReducer;
