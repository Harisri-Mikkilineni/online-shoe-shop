import React from "react";
import { useDispatch } from "react-redux";
import {
    removeFromCart,
    adjustQty,
    incrementQty,
    decrementQty,
} from "../../redux/products_actions";

const CartItem = ({ productInCart }) => {
    const dispatch = useDispatch(); // to dispatch state

    console.log("selected product id", productInCart.id);

    return (
        <>
            <div className="cart_card" key={productInCart.id}>
                <div className="img_cart">
                    <img
                        src={productInCart.product_image_url}
                        alt={`${productInCart.product_name}`}
                        id="product_pic"
                    />
                </div>

                <div className="product_description_cart">
                    <h4> {productInCart.product_name} </h4>
                    <p>{productInCart.product_description}</p>
                    <span>
                        Shoe size:
                        <input
                            type="number"
                            min="4"
                            max="10"
                            id="size"
                            name="size"
                            placeholder="4"
                        />
                        <p>{productInCart.product_price + "€"}</p>
                    </span>
                    <div>
                        Quantity: {productInCart.qty}{" "}
                        <span>
                            Total:{" "}
                            {productInCart.product_price * productInCart.qty} €
                        </span>
                    </div>
                </div>
                <div className="cart_buttons">
                    <div className="inc_or_dec_cartItems">
                        <button
                            className="add_cart_btn"
                            onClick={() =>
                                dispatch(
                                    incrementQty(
                                        productInCart.id,
                                        productInCart.qty
                                    )
                                )
                            }
                        >
                            +
                        </button>
                        <button
                            className="add_cart_btn"
                            onClick={() => {
                                if (productInCart.qty <= 1) {
                                    return;
                                } else {
                                    dispatch(
                                        decrementQty(
                                            productInCart.id,
                                            productInCart.qty
                                        )
                                    );
                                }
                            }}
                        >
                            -
                        </button>
                    </div>
                    <div>
                        <button
                            className="add_cart_btn"
                            onClick={() => {
                                dispatch(removeFromCart(productInCart.id));
                                dispatch(adjustQty(productInCart.id));
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;
