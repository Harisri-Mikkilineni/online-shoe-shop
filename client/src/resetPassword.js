import { Component } from "react";
import { Link } from "react-router-dom";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        console.log("Reset Password just mounted");
    }

    incrementState() {
        this.setState({
            stage: this.state.stage + 1,
        });
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

    renderStage() {
        if (this.state.stage === 1) {
            return (
                <form>
                    <input
                        name="email"
                        placeholder="your@email.come"
                        type="email"
                        onChange={this.handleChange}
                    />
                    <button onClick={() => this.incrementState()}>
                        Submit
                    </button>
                </form>
            );
        } else if (this.state.stage === 2) {
            return (
                <form>
                    <input
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
                    <button onClick={() => this.incrementState()}>
                        Submit
                    </button>
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
