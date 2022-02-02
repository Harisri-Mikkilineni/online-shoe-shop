import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
            <h3 className="product_heading"></h3>

            {productsInCart &&
                productsInCart.map((productInCart) => (
                    <CartItems
                        key={productInCart.id}
                        productInCart={productInCart}
                    />
                ))}

            <div className="checkout">
                <h3>Cart Summary</h3>

                <div className="cart_counter">
                    <span>
                        Total Items:{" "}
                        {productsInCart.reduce((a, b) => a + b.qty, 0)}
                    </span>
                </div>

                <span>
                    Total Price:{" "}
                    {productsInCart.reduce(
                        (a, b) => a + b.product_price * b.qty,
                        0
                    )}
                    €
                </span>

                <Link to={"/checkout"}>
                    <button className="add_cart_btn">
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Cart;
