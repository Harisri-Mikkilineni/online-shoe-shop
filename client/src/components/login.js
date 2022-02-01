import { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        console.log("Login just mounted");
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

    handleLogin(e) {
        e.preventDefault();
        console.log("user wants to login", this.state);
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log("response data from /login.json:", data.success);
                if (data.success === true) {
                    location.reload();
                } else {
                    this.setState({
                        error: "Error appeared during Login",
                    });
                }
            })
            .catch((err) => console.log("err in fetch /login.json", err));
    }
    render() {
        return (
            <>
                <h1 className="login">Login Page</h1>

                {this.state.error && (
                    <h2 style={{ color: "red" }}>{this.state.error}</h2>
                )}

                <form>
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

                    <div>
                        <Link to="/resetPassword">Reset Password</Link>
                    </div>
                    <div>
                        <button onClick={this.handleLogin}>Login</button>
                    </div>
                </form>
            </>
        );
    }
}

export default Login;
