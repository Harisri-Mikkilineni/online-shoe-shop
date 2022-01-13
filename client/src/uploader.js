import { Component } from "react";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = "";
    }
    render() {
        return (
            <>
                <h1>UPLOADER</h1>
                <section className="upload"></section>
                <button className="x_close">X</button>
            </>
        );
    }
}
