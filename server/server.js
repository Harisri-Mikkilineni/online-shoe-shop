const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
const cookieSession = require("cookie-session");

//middleware
app.use(
    cookieSession({
        secret: `Happy Coding`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

//any routes that we are adding where the client is requesting or sending over
//data to store in the database have to go ABOVE the star route below!!
//registration page post route
app.post("/register.json", (req, res) => {
    console.log("body:", req.body);
    const data = req.body;
    const firstName = data.first;
    const lastName = data.last;
    const email = data.email;
    const password = data.password;

    console.log("user data:", firstName, lastName, email, password);

    hash(password)
        .then((hashedPw) => {
            console.log("hashedPw:", hashedPw);
            db.addUsers(firstName, lastName, email, hashedPw).then(
                ({ rows }) => {
                    req.session.userId = rows[0].id;
                    console.log("cookie id:", req.session.userId);
                    res.json({ success: true });
                }
            );
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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
