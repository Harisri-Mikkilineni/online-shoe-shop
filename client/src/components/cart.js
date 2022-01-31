import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/products_actions";
import { useParams, useHistory } from "react-router";

console.log("add to carT:", addToCart);

const Cart = ({ cart }) => {
    console.log("current product in cart:", cart);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch(); // to dispatch state

    const selectedProductinCart = useSelector(
        (state) => state.productsList.cart
    );

    console.log("product from global state:", selectedProductinCart);

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
    console.log(
        "data in selected single item bjhuziup:",
        selectedProductinCart
    );

    if (!selectedProductinCart) {
        return null;
    }
    return (
        <>
            <div className="product_card" key={selectedProductinCart.id}>
                <img
                    src={selectedProductinCart.product_image_url}
                    alt={`${selectedProductinCart.product_name}`}
                    id="product_pic"
                />
                <div className="product_description">
                    <h4> {selectedProductinCart.product_name} </h4>
                    <p>{selectedProductinCart.product_price + "€"}</p>
                    <p>{selectedProductinCart.product_description}</p>
                </div>
                <button className="add_cart_btn">Delete</button>

                <button className="add_cart_btn">Checkout</button>
            </div>
        </>
    );
};

export default Cart;
