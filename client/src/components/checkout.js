import React from "react";
import { useState } from "react";

const Checkout = () => {
    const [userInput, setUserInput] = useState({});
    const [showMessage, setShowMessage] = useState(false);

    const handlePay = (e) => {
        e.preventDefault();
        console.log("button was clicked");
        console.log(userInput);

        // step 1: Make a POST request to update the DB
        fetch("/checkout.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((res) => res.json())
            .then((data) => {
                //if it worked set
                console.log("user inputtt:", userInput);
                console.log("response data from /checkout.json:", data);
                if (data.success === true) {
                    setShowMessage(true);
                }
            });
    };

    const handleChange = ({ target }) => {
        //to update state we use this.setState and pass to it an object with our state changes
        setUserInput({
            ...userInput,
            [target.name]: target.value,
        });
    };

    return (
        <>
            <h1 className="login">Payment</h1>

            {/* {this.state.error && (
                <h2 style={{ color: "red" }}>{this.state.error}</h2>
            )} */}
            {!showMessage && (
                <form>
                    <input
                        name="email"
                        placeholder="your@email.com"
                        type="email"
                        onChange={handleChange}
                    />
                    <input
                        name="card_number"
                        placeholder="Card number"
                        type="text"
                        onChange={handleChange}
                    />
                    <input
                        name="cardholder_name"
                        placeholder="Card Holder Name"
                        type="text"
                        onChange={handleChange}
                    />
                    <input
                        name="billing_address"
                        placeholder="Billing Address"
                        type="text"
                        onChange={handleChange}
                    />
                    <br />

                    <div>
                        <button className="add_cart_btn" onClick={handlePay}>
                            Pay
                        </button>
                    </div>
                </form>
            )}
            {showMessage && (
                <div>
                    <h3>
                        Your Order #OSS4567891 was successful. Products will be
                        delivered in 2-3 working days.
                    </h3>
                    <h3>Thank you for shopping with us!</h3>
                </div>
            )}
        </>
    );
};

export default Checkout;
