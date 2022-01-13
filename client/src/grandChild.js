import { Component } from "react";

export default class GrandChildComponent extends Component {
    constructor() {
        super();
        this.state = {};
    }
    ComponentDidMount() {
        console.log("grandchild Component mounted");
        console.log("props in grandChild", this.props);
        if (this.props.favoriteSweet) {
            this.setState({
                btnText: "edit",
            });
        } else {
            this.setState({
                btnText: "add",
            });
        }
    }
    render() {
        return (
            <>
                <h1>I am GrandChildComponent</h1>
            </>
        );
    }
}
