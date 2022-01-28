//import { connect } from "react-redux";

import { useEffect, useState } from "react";

export default function Products() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        //Step 1: fetch products
        console.log("Products just mounted");
        fetch("/getAllProducts")
            .then((res) => res.json())
            .then((data) => {
                //recieve data back
                console.log("all products data:", data);
                setItems(data);
            });
    }, []);

    return (
        <>
            <h3 className="product_heading">These are list of products</h3>
            <div className="products_container">
                {items.map((item) => (
                    <div className="products_card" key={item.id}>
                        <img
                            src={item.product_image_url}
                            alt={`${item.product_name}`}
                            id="product_pic"
                        />
                        <div className="product_description">
                            <h4> {item.product_name} </h4>
                            <p>{item.product_price}</p>
                            <p>{item.product_description}</p>
                        </div>
                        <button className="add_cart_btn">Add To Cart</button>
                    </div>
                ))}
            </div>
        </>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         products: state.productsList.products,
//     };
// };

//export default connect(mapStateToProps)(Products);
