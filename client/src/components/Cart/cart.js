import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/products_actions";
import CartItems from "./cartItems.js";
import { useParams, useHistory } from "react-router";

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
            <h3 className="product_heading">Products added to Cart</h3>
            {productsInCart &&
                productsInCart.map((productInCart) => (
                    <CartItems
                        key={productInCart.id}
                        productInCart={productInCart}
                    />
                ))}
        </>
    );
};

export default Cart;
