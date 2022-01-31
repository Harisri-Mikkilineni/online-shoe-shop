import { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Products } from "./components/Products/products";
import SingleProduct from "./components/singleProduct.js";

export default class App extends Component {
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
                    first: data.first,
                    last: data.last,
                    url: data.image_url,
                    email: data.email,
                    bio: data.bio,
                });
            })
            .catch((err) => {
                console.log("error on navigation after  data:", err);
            });
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
        return (
            <>
                <BrowserRouter>
                    <div className="app_bgc">
                        <section id="mainPage">
                            <img src="/logo.JPG" alt="online shop" id="logo" />
                            <div>
                                <Link className="link" to="/products">
                                    Products
                                </Link>
                            </div>

                            <form action="/logout">
                                <button className="link">Logout</button>
                            </form>

                            <Link id="navbar_cart">
                                <div className="cart_text">Cart</div>
                                <div className="cart_counter">1</div>
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
                </BrowserRouter>
            </>
        );
    }
}
