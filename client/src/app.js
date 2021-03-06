import { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Products } from "./components/Products/products";
import SingleProduct from "./components/singleProduct.js";
import Cart from "./components/Cart/cart.js";
import { connect } from "react-redux";
import Checkout from "./components/checkout.js";

export class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameOtherStuff = this.logNameOtherStuff.bind(this);
    }

    componentDidMount() {
        console.log("App Component mounted");
        fetch("/navigation.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data on the navigation:", data);
                this.setState({
                    id: data.id,
                });
            })
            .catch((err) => {
                console.log("error on navigation after  data:", err);
            });
    }

    componentDidUpdate() {
        console.log("props in update:", this.props);
    }

    toggleUploader() {
        console.log("button was clicked");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    logNameOtherStuff(val) {
        console.log(this.state.name + val);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        const cartCount = this.props.cartProp.reduce((a, b) => a + b.qty, 0);

        console.log("props:", this.props);
        return (
            <>
                <BrowserRouter>
                    <div className="app_bgc">
                        <section id="mainPage">
                            <img src="/logoo.png" alt="online shop" id="logo" />
                            <div>
                                <Link className="link" to="/products">
                                    Products
                                </Link>
                            </div>

                            <form action="/logout">
                                <button className="link">Logout</button>
                            </form>

                            <Link id="navbar_cart" to="/cart">
                                <div className="cart_text">Cart: </div>
                                {/* <img src="" id="logo" /> */}
                                <div
                                    className={
                                        cartCount
                                            ? "counter_red"
                                            : "counter_black"
                                    }
                                >
                                    {cartCount}
                                </div>
                            </Link>
                        </section>
                    </div>

                    <Route exact path="/" component={Products} />
                    <Route
                        exact
                        path="/product/:id"
                        component={SingleProduct}
                    />

                    <Route exact path="/products">
                        <Products />
                    </Route>
                    <Route exact path="/cart">
                        <Cart />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        cartProp: state.productsList.cart,
        changeColor: state.productsList.changeColor,
        clearCart: state.productsList.clearCart,
    };
};

export default connect(mapStateToProps)(App);
