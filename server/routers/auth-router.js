const express = require("express");
const auth = express.Router();
const { hash, compare } = require("../utils/bcrypt");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../utils/ses");
const {
    getUserByEmail,
    addUsers,
    getResetPwCode,
    addResetPwCode,
    updateUserPw,
    getUserById,
} = require("../sql/db");

/****************************ROUTES**************************/

auth.get("/user/id.json", function (req, res) {
    //once you setup your cookie middleware you can un comment below code
    res.json({
        userId: req.session.userId,
    });
});

/*-------------------POST LOGIN ROUTE------------------------*/
auth.post("/login.json", (req, res) => {
    console.log("body:", req.body);
    const { email, password } = req.body;
    console.log("email:[0], password:[1]", req.body.email, req.body.password);
    if (email && password) {
        getUserByEmail(email)
            .then(({ rows }) => {
                console.log("rows[0]:", rows[0].password);
                const hashedDbPswd = rows[0].password;
                compare(password, hashedDbPswd).then((match) => {
                    console.log(
                        "do provided PW and db stored hashedPassword match?",
                        match
                    );
                    if (match === true) {
                        req.session.userId = rows[0].id;
                        console.log("cookie id:", req.session.userId);
                        res.json({ success: true });
                    } else res.json({ success: false });
                });
            })
            .catch((err) => {
                console.log("err in compare", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

/*-------------------POST REGISTRATION ROUTE------------------------*/
auth.post("/register.json", (req, res) => {
    console.log("body:", req.body);
    const data = req.body;
    const firstName = data.first;
    const lastName = data.last;
    const email = data.email;
    const password = data.password;
    const mobileNumber = data.mobile;
    const address = data.address;

    console.log(
        "user data:",
        firstName,
        lastName,
        email,
        password,
        mobileNumber,
        address
    );

    hash(password)
        .then((hashedPw) => {
            console.log("hashedPw:", hashedPw);
            addUsers(
                firstName,
                lastName,
                email,
                hashedPw,
                mobileNumber,
                address
            ).then(({ rows }) => {
                req.session.userId = rows[0].id;
                console.log("cookie id:", req.session.userId);
                res.json({ success: true });
            });
        })
        .catch((err) => {
            console.log("err in adding user", err);
            res.json({ success: false });
        })
        .catch((err) => {
            console.log("err in hash", err);
        });
});

/*-------------------POST PASSWORD RESET START ROUTE------------------------*/
auth.post("/password/reset/start.json", (req, res) => {
    console.log("body:", req.body);
    const { email } = req.body;
    console.log("email:[0],password:[1]", req.body.email);
    getUserByEmail(email)
        .then(({ rows }) => {
            console.log("rows[0]:", rows[0].email);
            const userEmail = rows[0].email;

            if (email === userEmail) {
                console.log("provided Email and db stored Email matched");
                const randomString = cryptoRandomString({
                    length: 6,
                });
                addResetPwCode(email, randomString).then(({ rows }) => {
                    console.log("code rows[0]:", rows[0].code);
                    const subject = "Reset your password";
                    const body = `Here is your new code: ${randomString}`;
                    const recipient = "harisri.mikkilineni@gmail.com";
                    sendEmail(subject, body, recipient);
                    res.status(200).json();
                });
                res.json({ success: true });
            } else res.json({ success: false });
        })
        .catch((err) => {
            console.log("Email doesn't match", err);
        });
});

/*-------------------POST PASSWORD RESET VERIFY ROUTE------------------------*/
auth.post("/password/reset/confirm.json", (req, res) => {
    console.log("body:", req.body);
    const { email, password } = req.body;
    console.log(
        "email:[0],code:[1],password:[2]",
        req.body.email,
        req.body.code,
        req.body.password
    );
    getResetPwCode().then(({ rows }) => {
        console.log("rows:", rows);
        if (rows) {
            hash(password).then((hashedPw) => {
                console.log("hashedPw:", hashedPw);
                updateUserPw(email, hashedPw)
                    .then(({ rows }) => {
                        console.log("data after updating user password:", rows);
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log(
                            "Error in updating password in table:",
                            err
                        );
                    });
            });
        }
    });
});

/*-------------------NAVIGATION------------------------*/
auth.get("/navigation.json", (req, res) => {
    console.log("req session in nav:", req.session);
    getUserById(req.session.userId)
        .then(({ rows }) => {
            console.log("rows in nav:", rows);

            res.json(rows[0]);
        })
        .catch((err) => console.log("err in opening modal:", err));
});

/*-------------------LOGOUT ROUTE------------------------*/
auth.get("/logout", function (req, res) {
    console.log("logout session userId:", req.session);
    req.session = null;
    res.redirect("/");
});

/*************************** EXPORT ***************************/

module.exports = auth;
