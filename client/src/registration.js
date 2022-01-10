import { Component } from "react";
export class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        //to not cause cannot read setState of undefined errors, you need to bind the value of "this"
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Registration just mounted");
    }

    handleChange({ target }) {
        console.log("input value changed");
        console.log("value typed:", target.value);
        console.log("name of target:", target.name);
        //to update state we use this.setState and pass to it an object with our state changes
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log("handleChange update done:", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("user wants to submit their details", this.state);
        //we now want to send user's data to the server
        //we use fetch post
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) =>
                console.log("response data from /register.json:", data)
            )
            //depending on whetehr or not we recieve a successful server response
            //we want to render an errror state
            .catch(
                (err) => console.log("err in fetch /register.json", err)
                //we want to render an error state meaning we want to setState and pass to it
                //an Object containing an error property and some value
            );
    }
    render() {
        return (
            <>
                <h1>Registration</h1>

                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}
                <form>
                    <input
                        name="first"
                        placeholder="First Name"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="last"
                        placeholder="Last Name"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="email"
                        placeholder="your@email.come"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSubmit}>Register</button>
                </form>
            </>
        );
    }
}
