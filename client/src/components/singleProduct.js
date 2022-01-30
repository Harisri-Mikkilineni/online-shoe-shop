import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart } from "../redux/products_actions";
import { useParams, useHistory } from "react-router";

const SingleProduct = ({ currentProduct, addToCart }) => {
    console.log("current product in SingleComponent:", currentProduct);
    const { id } = useParams();
    const history = useHistory();
    const [singleItem, setSingleItem] = useState();

    useEffect(() => {
        //Step 1: fetch products
        console.log("Single product just mounted");
        fetch(`/product/${id}`)
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                console.log("all products data:", data);
                if (data.success === false) {
                    history.replace("/");
                } else {
                    setSingleItem(data);
                }
            });
    }, [id]);

    console.log("data in single item:", singleItem);

    return (
        <>
            <div className="single_product" key={singleItem.id}>
                <img
                    src={singleItem.product_image_url}
                    alt={`${singleItem.product_name}`}
                    id="product_pic"
                />
                <div className="product_description">
                    <h4> {singleItem.product_name} </h4>
                    <p>{singleItem.product_price + "€"}</p>
                    <p>{singleItem.product_description}</p>
                </div>
                <button
                    onClick={() => addToCart(singleItem.id)}
                    className="add_cart_btn"
                >
                    Add To Cart
                </button>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        currentProduct: state.productsList.singleItem,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch(addToCart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
