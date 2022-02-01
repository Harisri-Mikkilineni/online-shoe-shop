import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    deleteFromCart,
    adjustQty,
} from "../redux/products_actions";
import { useParams, useHistory } from "react-router";

console.log("add to carT:", addToCart);

const Cart = ({ cart }) => {
    console.log("current product in cart:", cart);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch(); // to dispatch state

    const productsInCart = useSelector((state) => state.productsList.cart);

    console.log("cart from global state:", productsInCart);

    useEffect(() => {
        //Step 1: fetch products
        console.log("Cart just mounted");
        fetch(`/api/product/${id}`)
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                // console.log("all products data:", data);
                if (data.success === false) {
                    history.replace("/");
                } else {
                    dispatch(addToCart(data));
                }
            });
    }, []);
    console.log("data in cart item itemmmm:", productsInCart);

    return (
        <>
            {productsInCart &&
                productsInCart.map((productInCart) => (
                    <div className="cart_card" key={productInCart.id}>
                        <img
                            src={productInCart.product_image_url}
                            alt={`${productInCart.product_name}`}
                            id="product_pic"
                        />
                        <div className="product_description">
                            <h4> {productInCart.product_name} </h4>
                            <p>{productInCart.product_price + "€"}</p>
                            <p>{productInCart.product_description}</p>
                            <span>qty: {productInCart.qty}</span>
                        </div>
                        <button
                            className="add_cart_btn"
                            onClick={() => {
                                dispatch(deleteFromCart(productInCart.id));
                                dispatch(adjustQty(productInCart.id));
                            }}
                        >
                            Delete
                        </button>
                        <button className="add_cart_btn">Checkout</button>
                    </div>
                ))}
        </>
    );
};

export default Cart;
