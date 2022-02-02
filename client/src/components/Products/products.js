import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../redux/products_actions";
import Product from "./product.js";

export function Products() {
    const dispatch = useDispatch(); // to dispatch state

    // useSElector to get items from redux global state
    const loadedProducts = useSelector((state) => state.productsList.products);
    console.log("products from global state:", loadedProducts);

    //
    useEffect(() => {
        //Step 1: fetch products
        console.log("Products just mounted");
        fetch("/getAllProducts")
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                console.log("all products data:", data);
                // setItems(data);
                dispatch(loadProducts(data));
            });
    }, []);

    return (
        <>
            <h3 className="product_heading"></h3>
            <div className="products_container">
                {loadedProducts &&
                    loadedProducts.map((loadedProduct) => (
                        <div className="products_card" key={loadedProduct.id}>
                            <Product
                                key={loadedProduct.id}
                                productData={loadedProduct}
                            />
                        </div>
                    ))}
            </div>
        </>
    );
}
