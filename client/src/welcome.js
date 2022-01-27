import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Registration } from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";
//  <img className="logo" src="/logo.JPG" alt="logo" />
export default function Welcome() {
    return (
        <>
            <div className="container">
                <section className="section-top">
                    <h1 className="title">WELCOME TO ONLINE SHOP</h1>
                </section>

                <section className="section-bottom">
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
