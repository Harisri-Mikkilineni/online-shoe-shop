import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { addToCart, changeModal } from "../redux/products/products_actions";
import Modal from "react-modal";

export function Products() {
    const [items, setItems] = useState([]);
    const [ModalIsOpen, setModalIsOpen]  = useState(false);
    const dispatch = useDispatch();

    // handleClick = (id) => {
    //     this.props.addToCart(id);
    // };

    const changeModal = (modal) => {
        const currentModal = {
            showModal: true,
            modalType: modal,
        };
        this.props.changeModal({ item.id});
    };

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

    const handleAddToCart = (id) => {
        console.log("button was clicked");
        console.log("handle added to cart id:", id);
        // step 1: Make a POST request to update the DB
        fetch("/friendship/accept", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("response data from add_to_cart.json:", data);
                // Step 2: Dispatch an action to update the Redux store
                dispatch(addToCart(id));
            });

        // action creator makeFriend
    };

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
                            <p>{item.product_price + "€"}</p>
                            <p>{item.product_description}</p>
                        </div>
                        <div className="btn_box">
                            <button
                                className="add_cart_btn"
                                onClick={() => {
                                    handleAddToCart(item.id);
                                }}
                            >
                                Add To Cart
                            </button>
                            <button
                                className="add_cart_btn"
                                onClick={() => {
                                    changeModal(item.id);
                                }}
                            >
                                View Item
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
    };
};

const mapDispatchToProps = (dispatch) => ({
    changeModal: (payload) => dispatch(changeModal(payload)),
});

// const mapDispatchToProps1 = (dispatch) => {
//     return {
//         addToCart: (id) => {
//             dispatch(addToCart(id));
//         },
//     };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Products);

// const mapStateToProps = (state) => {
//     return {
//         products: state.productsList.products,
//     };
// };

//export default connect(mapStateToProps)(Products);
