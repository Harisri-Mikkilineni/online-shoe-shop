import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/products_actions";

import { connect } from "react-redux";
import Product from "./product.js";

export function Products() {
    const dispatch = useDispatch(); // to dispatch state
    const [items, setItems] = useState([]);

    // handleClick = (id) => {
    //     this.props.addToCart(id);
    // };

    useEffect(() => {
        //Step 1: fetch products
        console.log("Products just mounted");
        fetch("/getAllProducts")
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                console.log("all products data:", data);
                setItems(data);
                dispatch(addToCart(data));
            });
    }, []);

    console.log("items:", items);

    // const handleAddToCart = (id) => {
    //     console.log("button was clicked");
    //     console.log("handle added to cart id:", id);
    //     // step 1: Make a POST request to update the DB
    //     fetch("/friendship/accept", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("response data from add_to_cart.json:", data);
    //             // Step 2: Dispatch an action to update the Redux store
    //             dispatch(addToCart(id));
    //         });

    //     // action creator makeFriend
    // };

    return (
        <>
            <h3 className="product_heading">These are list of products</h3>
            <div className="products_container">
                {items.map((item) => (
                    <div className="products_card" key={item.id}>
                        <Product key={item.id} productData={item} />
                    </div>
                ))}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        items: state.productsList.items,
    };
};

export default connect(mapStateToProps)(Products);

// const mapStateToProps = (state) => {
//     return {
//         products: state.productsList.products,
//     };
// };

//export default connect(mapStateToProps)(Products);
