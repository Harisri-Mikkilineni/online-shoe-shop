import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
    return (
        <>
            <h1 className="login">Payment</h1>

            {this.state.error && (
                <h2 style={{ color: "red" }}>{this.state.error}</h2>
            )}

            <form>
                <input name="email" placeholder="your@email.com" type="email" />
                <input
                    name="card_number"
                    placeholder="Card number"
                    type="text"
                />
                <input
                    name="cardholder_name"
                    placeholder="Card Holder Name"
                    type="text"
                />
                <input
                    name="billing_address"
                    placeholder="Billing Address"
                    type="text"
                />
                <br />

                <div>
                    <button className="add_cart_btn">Pay</button>
                </div>
            </form>
        </>
    );
};

export default Checkout;
