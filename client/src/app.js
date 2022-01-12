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
    }

    componentDidMount() {
        console.log("App component mounted");
    }

    toggleUploader() {
        console.log("button was clicked");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    logNameOtherStuff(val) {
        console.log(this.state.name + val);
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
                        imageUrl="https://previews.123rf.com/images/rawpixel/rawpixel1504/rawpixel150405509/38967820-social-network-social-media-gesch%C3%A4ftsleute-technologie-konzept.jpg"
                        loggerFunc={this.logNameOtherStuff}
                    />
                </section>
                {this.state.uploaderIsVisible && <Uploader />}
                <button onClick={this.toggleUploader}>
                    Show or hide uploader
                </button>
            </>
        );
    }
}
