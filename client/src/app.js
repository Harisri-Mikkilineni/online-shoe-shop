import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindUser from "./findUser";

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
                    <section id="mainPage">
                        <img
                            src="logo.JPG"
                            alt="social network logo"
                            id="homepage-logo"
                        />
                        <div>
                            <Link className="findUsers_link" to="/users">
                                Find Users
                            </Link>
                        </div>

                        <ProfilePic
                            first={this.first}
                            last={this.last}
                            imageUrl={this.state.url}
                            loggerFunc={this.logNameOtherStuff}
                        />
                    </section>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            toggleUploader={this.toggleUploader}
                            logNameOtherStuff={this.logNameOtherStuff}
                            closeModal={this.closeModal}
                            changeImage={this.changeImage}
                        />
                    )}

                    <Route exact path="/">
                        <Profile
                            first={this.state.first}
                            last={this.state.last}
                            bio={this.state.bio}
                            imageUrl={this.state.url}
                            toggleUploader={this.toggleUploader}
                            loggerFunc={this.logNameOtherStuff}
                            updateProfileBio={this.updateProfileBio}
                        />
                    </Route>

                    <Route path="/users">
                        <FindUser />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}
