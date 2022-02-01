import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentProduct, addToCart } from "../redux/products_actions";
import { useParams, useHistory } from "react-router";

const SingleProduct = ({ currentProduct }) => {
    console.log("current product in SingleComponent:", currentProduct);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch(); // to dispatch state

    const selectedProduct = useSelector(
        (state) => state.productsList.currentProduct
    );

    console.log("product from global state:", selectedProduct);

    useEffect(() => {
        //Step 1: fetch products
        console.log("Single product just mounted");
        fetch(`/api/product/${id}`)
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                // console.log("all products data:", data);
                if (data.success === false) {
                    history.replace("/");
                } else {
                    dispatch(loadCurrentProduct(data));
                }
            });
    }, []);
    console.log("data in selected single item bjhuziup:", selectedProduct);

    if (!selectedProduct) {
        return null;
    }
    return (
        <>
            <div className="product_card" key={selectedProduct.id}>
                <img
                    src={selectedProduct.product_image_url}
                    alt={`${selectedProduct.product_name}`}
                    id="product_pic"
                />
                <div className="product_description">
                    <h4> {selectedProduct.product_name} </h4>
                    <p>{selectedProduct.product_price + "€"}</p>
                    <p>{selectedProduct.product_description}</p>
                </div>
                <Link
                    to={"/cart"}
                    onClick={() => dispatch(addToCart(selectedProduct.id))}
                >
                    <button className="add_cart_btn">Add To Cart</button>
                </Link>
            </div>
        </>
    );
};

export default SingleProduct;
