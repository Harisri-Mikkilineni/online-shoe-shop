import { Component } from "react";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
        this.uploadImageHandler = this.uploadImageHandler.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
    }

    fileSelectHandler(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    uploadImageHandler(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.file);
        console.log("file file file:", this.state.file);
        fetch("/updateImage.json", {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("image data data data:", data.image_url);
                this.props.changeImage(data.image_url);
            })
            .catch((err) => {
                console.log("error in updating image:", err);
            });
    }
    render() {
        return (
            <>
                <section className="modal">
                    <h1>Want to Change your Profile Pic?</h1>
                    <button className="x_close" onClick={this.props.closeModal}>
                        X
                    </button>
                    <form>
                        <input
                            className="file"
                            onChange={this.fileSelectHandler}
                            type="file"
                            name="file"
                            accept="image/*"
                        />
                        <button
                            className="uploadbtn"
                            onClick={this.uploadImageHandler}
                        >
                            Upload
                        </button>
                    </form>
                </section>
            </>
        );
    }
}
