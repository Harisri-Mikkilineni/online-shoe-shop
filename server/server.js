const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
//const { uploader } = require("./upload");
//const s3 = require("./s3");
const server = require("http").Server(app);
const cookieSession = require("cookie-session");

/*=============================middleware============================*/

const cookieSessionMiddleware = cookieSession({
    secret: `Happy Coding`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

app.use((req, res, next) => {
    console.log("req.url:", req.url);
    next();
});

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());
/*=============================Routes================================*/
//any routes that we are adding where the client is requesting or sending over
//data to store in the database have to go ABOVE the star route below!!

//POST REGISTRATION ROUTE
app.post("/register.json", (req, res) => {
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
            db.addUsers(
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

app.get("/user/id.json", function (req, res) {
    //once you setup your cookie middleware you can un comment below code
    res.json({
        userId: req.session.userId,
    });
});

//POST LOGIN ROUTE
app.post("/login.json", (req, res) => {
    console.log("body:", req.body);
    const { email, password } = req.body;
    console.log("email:[0], password:[1]", req.body.email, req.body.password);
    if (email && password) {
        db.getUserByEmail(email)
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
//POST PASSWORD RESET START ROUTE
app.post("/password/reset/start.json", (req, res) => {
    console.log("body:", req.body);
    const { email } = req.body;
    console.log("email:[0],password:[1]", req.body.email);
    db.getUserByEmail(email)
        .then(({ rows }) => {
            console.log("rows[0]:", rows[0].email);
            const userEmail = rows[0].email;

            if (email === userEmail) {
                console.log("provided Email and db stored Email matched");
                const randomString = cryptoRandomString({
                    length: 6,
                });
                db.addResetPwCode(email, randomString).then(({ rows }) => {
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
//POST PASSWORD RESET VERIFY ROUTE
app.post("/password/reset/confirm.json", (req, res) => {
    console.log("body:", req.body);
    const { email, password } = req.body;
    console.log(
        "email:[0],code:[1],password:[2]",
        req.body.email,
        req.body.code,
        req.body.password
    );
    db.getResetPwCode().then(({ rows }) => {
        console.log("rows:", rows);
        if (rows) {
            hash(password).then((hashedPw) => {
                console.log("hashedPw:", hashedPw);
                db.updateUserPw(email, hashedPw)
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

//GET ALL PRODUCTS
app.get("/getAllProducts", (req, res) => {
    console.log("all products data", req.body);
    db.getAllProducts()
        .then(({ rows }) => {
            console.log("Got all products from table:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("err in getting all products from table", err);
        });
});

//GET PRODUCT BY ID
app.get("/api/product/:id", (req, res) => {
    console.log("selected product on server side", req.body);
    console.log("params for selected product on server side", req.params);
    //const search = req.params.search;
    db.getProductById(req.params.id)
        .then(({ rows }) => {
            console.log("Got other product by id:", rows);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("err in getting  product by id", err);
        });
});

//GET FOR NAVIGATION
app.get("/navigation.json", (req, res) => {
    console.log("req session in nav:", req.session);
    db.getUserById(req.session.userId)

        .then(({ rows }) => {
            console.log("rows in nav:", rows);

            res.json(rows[0]);
        })
        .catch((err) => console.log("err in opening modal:", err));
});

//POST CHECKOUT ROUTE
app.post("/checkout.json", (req, res) => {
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
    db.addCheckoutDetails(email, cardNumber, cardholderName, billingAddress)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => console.log("err in adding checkout details:", err));
});

// LOGOUT ROUTE
app.get("/logout", function (req, res) {
    console.log("logout session userId:", req.session);
    req.session = null;
    res.redirect("/");
});

//
app.get("*", function (req, res) {
    console.log("I am loading here:", req.url, req.method);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
