const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const server = require("http").Server(app);

/*************************** REQUIRE ROUTERS ***************************/

const auth = require("./routers/auth-router");
const products = require("./routers/get-products-router");
const checkout = require("./routers/checkout-router");

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

/*************************** ROUTERS ***************************/

app.use(auth);
app.use(products);
app.use(checkout);

// ************************* ANY ROUTES ABOVE ******************************

app.get("*", function (req, res) {
    console.log("I am loading here:", req.url, req.method);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
