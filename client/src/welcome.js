import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Registration } from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <>
            <div className="container">
                <section className="section-left">
                    <h1 className="title">WELCOME TO CHIT CHAT</h1>
                    <img className="logo" src="/logo.JPG" alt="logo" />
                </section>

                <section className="section-right">
                    <BrowserRouter>
                        <div>
                            <Switch>
                                <Route exact path="/">
                                    <Registration />
                                </Route>

                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/resetPassword">
                                    <ResetPassword />
                                </Route>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </section>
            </div>
        </>
    );
}
