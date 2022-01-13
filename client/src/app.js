import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import ChildComponent from "./child";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNameOtherStuff = this.logNameOtherStuff.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        console.log("App Component mounted");
        fetch("/navigation.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data on the navigation:", data);
                this.state({
                    id: data.id,
                    first: data.first,
                    last: data.last,
                    url: data.url,
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
                <ChildComponent />
                <section id="mainPage">
                    <img
                        src="logo.JPG"
                        alt="social network logo"
                        id="homepage-logo"
                    />

                    <ProfilePic
                        first="Harisri"
                        last="Mikkilineni"
                        imageUrl="https://previews.123rf.com/images/rawpixel/rawpixel1504/rawpixel150405509/38967820-social-network-social-media-gesch%C3%A4ftsleute-technologie-konzept.jpg"
                        loggerFunc={this.logNameOtherStuff}
                    />
                </section>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        toggleUploader={this.toggleUploader}
                        logNameOtherStuff={this.logNameOtherStuff}
                        closeModal={this.closeModal}
                    />
                )}
            </>
        );
    }
}
