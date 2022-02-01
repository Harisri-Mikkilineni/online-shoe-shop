import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/products_actions";
import { useParams, useHistory } from "react-router";

console.log("add to carT:", addToCart);

const Cart = ({ cart }) => {
    console.log("current product in cart:", cart);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch(); // to dispatch state

    const addProductsToCart = useSelector((state) => state.productsList.cart);

    console.log("cart from global state:", addProductsToCart);

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
    console.log("data in cart item itemmmm:", addProductsToCart);

    return (
        <>
            {addProductsToCart &&
                addProductsToCart.map((addProductToCart) => (
                    <div className="cart_card" key={addProductToCart.id}>
                        <img
                            src={addProductToCart.product_image_url}
                            alt={`${addProductToCart.product_name}`}
                            id="product_pic"
                        />
                        <div className="product_description">
                            <h4> {addProductToCart.product_name} </h4>
                            <p>{addProductToCart.product_price + "€"}</p>
                            <p>{addProductToCart.product_description}</p>
                            <span>qty: {addProductToCart.qty}</span>
                        </div>
                        <button
                            className="add_cart_btn"
                            onClick={() =>
                                dispatch(deleteFromCart(addProductToCart.id))
                            }
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
