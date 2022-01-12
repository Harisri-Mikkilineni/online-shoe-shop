import { Component } from "react";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetUserStart = this.resetUserStart.bind(this);
        this.resetUserConfirm = this.resetUserConfirm.bind(this);
    }
    componentDidMount() {
        console.log("Reset Password just mounted");
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

    resetUserStart(e) {
        e.preventDefault();
        console.log("user wants to submit email address", this.state);

        //we now want to send user's data to the server
        //we use fetch post
        fetch("/password/reset/start.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(
                    "response data from /password/reset/start.json:",
                    data.success
                );
                if (data.success === true) {
                    this.setState({
                        stage: this.state.stage + 1,
                    });
                } else {
                    this.setState({
                        error: "Error appeared during reset password stage 1",
                    });
                }
            })
            .catch(
                (err) =>
                    console.log("err in fetch /password/reset/start.json", err)
                //we want to render an error state meaning we want to setState and pass to it
                //an Object containing an error property and some value
            );
    }

    resetUserConfirm(e) {
        e.preventDefault();
        console.log("user wants to verify code", this.state);
        //we now want to send user's data to the server
        //we use fetch post
        fetch("/password/reset/confirm.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(
                    "response data from /password/reset/confirm.json:",
                    data.success
                );
                if (data.success === true) {
                    this.setState({
                        stage: this.state.stage + 1,
                    });
                } else {
                    this.setState({
                        error: "Error appeared during reset password stage 2",
                    });
                }
            })
            .catch(
                (err) =>
                    console.log(
                        "err in fetch /password/reset/confirm.json",
                        err
                    )
                //we want to render an error state meaning we want to setState and pass to it
                //an Object containing an error property and some value
            );
    }

    renderStage() {
        if (this.state.stage === 1) {
            return (
                <form onSubmit={() => this.resetUserStart()}>
                    <input
                        key="1"
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            );
        } else if (this.state.stage === 2) {
            return (
                <form onSubmit={() => this.resetUserConfirm()}>
                    <input
                        key="2"
                        name="code"
                        placeholder="code"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            );
        } else if (this.state.stage === 3) {
            return (
                <>
                    <h1>Password Reset Successful!</h1>
                    <div>
                        <Link to="/login">Login</Link>
                    </div>
                </>
            );
        }
    }

    render() {
        return (
            <>
                <h1>Reset Password</h1>

                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}

                {this.renderStage()}
            </>
        );
    }
}

export default ResetPassword;
