import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameOtherStuff = this.logNameOtherStuff.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeImage = this.changeImage.bind(this);
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

    //Make fetch request to get data for currently logged in user
    //and store this data in the component state
    render() {
        return (
            <>
                <section id="mainPage">
                    <img
                        src="logo.JPG"
                        alt="social network logo"
                        id="homepage-logo"
                    />

                    <ProfilePic
                        first="Harisri"
                        last="Mikkilineni"
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
            </>
        );
    }
}
