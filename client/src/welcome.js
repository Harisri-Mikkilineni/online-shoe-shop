import { BrowserRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <>
            <section className="nav1">
                <h1>Welcome to Chitchat</h1>
                <img className="logo" src="/logo.JPG" alt="logo" />
            </section>
            <section className="nav2">
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/resetPassword">
                            <ResetPassword />
                        </Route>
                    </div>
                </BrowserRouter>
            </section>
        </>
    );
}
