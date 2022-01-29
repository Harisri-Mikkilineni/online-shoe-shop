import { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Products } from "./components/products";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            bio: "bio",
            first: "first",
            last: "last",
            url: "url",
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameOtherStuff = this.logNameOtherStuff.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.updateProfileBio = this.updateProfileBio.bind(this);
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

    changeImage(image_url) {
        console.log("my url image:", image_url);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
            url: image_url,
        });
    }

    logNameOtherStuff(val) {
        console.log(this.state.name + val);
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    closeModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateProfileBio(bio) {
        console.log("update profile Bio method:", bio);
        this.setState({ bio: bio });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <div className="app_bgc">
                        <section id="mainPage">
                            <img
                                src="/logo.JPG"
                                alt="online shop"
                                id="homepage-logo"
                            />
                            <div>
                                <Link className="link" to="/products">
                                    Products
                                </Link>
                            </div>

                            <form action="/logout">
                                <button className="link">Logout</button>
                            </form>

                            <div>
                                <Link>
                                    <img
                                        className="cart"
                                        src="https://www.xils-lab.com/images/pannier-grand.png"
                                    />
                                </Link>
                            </div>
                        </section>
                    </div>

                    <Route path="/products">
                        <Products />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}
