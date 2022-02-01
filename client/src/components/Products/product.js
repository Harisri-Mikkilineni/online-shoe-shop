import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/products_actions";

const Product = ({ productData }) => {
    const dispatch = useDispatch(); // to dispatch state
    /* Now we need product id which should be passed from products page*/

    return (
        <>
            <div className="products_container">
                <div className="products_card" key={productData.id}>
                    <img
                        src={productData.product_image_url}
                        alt={`${productData.product_name}`}
                        id="product_pic"
                    />
                    <div className="product_description">
                        <h4> {productData.product_name} </h4>
                        <p>{productData.product_price + "€"}</p>
                        <p>{productData.product_description}</p>
                    </div>
                    <div className="btn_box">
                        <Link to={`/product/${productData.id}`}>
                            <button
                                // onClick={() => loadCurrentProduct(productData)}
                                className="add_cart_btn"
                            >
                                View Item
                            </button>
                        </Link>

                        <button
                            className="add_cart_btn"
                            onClick={() => dispatch(addToCart(productData.id))}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
