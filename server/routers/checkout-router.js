const express = require("express");
const checkout = express.Router();
const { addCheckoutDetails } = require("../sql/db");

//POST CHECKOUT ROUTE
checkout.post("/checkout.json", (req, res) => {
    console.log("body:", req.body);
    const data = req.body;
    const email = data.email;
    const cardNumber = data.card_number;
    const cardholderName = data.cardholder_name;
    const billingAddress = data.billing_address;
    console.log(
        "user data:",
        email,
        cardNumber,
        cardholderName,
        billingAddress
    );
    addCheckoutDetails(email, cardNumber, cardholderName, billingAddress)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => console.log("err in adding checkout details:", err));
});

/*************************** EXPORT ***************************/

module.exports = checkout;
