const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const { uploader } = require("./upload");
const s3 = require("./s3");

/*=============================middleware============================*/
app.use(
    cookieSession({
        secret: `Happy Coding`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

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
//POST LOGIN ROUTE
app.post("/login.json", (req, res) => {
    console.log("body:", req.body);
    const { email, password } = req.body;
    console.log("email:[0],password:[1]", req.body.email, req.body.password);
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

app.post(
    "/updateImage.json",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const image_url = req.file.filename;
        console.log("req.file:", req.file.filename);
        console.log("body:", req.body);
        const id = req.session.userId;
        console.log(" image value:", image_url);
        const imageUrl = "https://harisribucket.s3.amazonaws.com/" + image_url;
        console.log("id:[0],url:[1]", id, imageUrl);
        db.updateImage(id, imageUrl)
            .then((data) => {
                console.log("image rows data in update image!");
                res.json(data.rows[0]);
            })
            .catch((err) => {
                console.log("error in updating image to database:", err);
            });
    }
);
//POST UPDATE BIO
app.post("/bio.json", (req, res) => {
    console.log("update bio req.body:", req.body);
    console.log("body:", req.body);
    const bio = req.body.bio;
    const id = req.session.userId;
    db.updateBio(id, bio)
        .then((data) => {
            console.log("updated bio data in db successfully!");
            res.json(data.rows[0]);
        })
        .catch((err) => {
            console.log("error in updating bio to database:", err);
        });
});

//GET FOR RECENTLY CREATED USERS
app.get("/recentUsers", (req, res) => {
    console.log("recently added users", req.body);
    db.getRecentUsers(req.session.userId)
        .then(({ rows }) => {
            console.log("Got 3 recently added users:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("err in getting recently added users", err);
        });
});

// GET USER BY MATCHING NAME
app.get("/findUsers/:search", (req, res) => {
    console.log("matched users", req.body);
    //const search = req.params.search;
    db.getUserbyMatchingName(req.params.search)
        .then(({ rows }) => {
            console.log("Got matched added users:", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("err in getting matched users", err);
        });
});

//GET USER BY ID
app.get("/api/users/:id", (req, res) => {
    console.log("other profile user", req.body);
    //const search = req.params.search;
    db.getUserById(req.params.id)
        .then(({ rows }) => {
            console.log("Got other profile user by id:", rows);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("err in getting other profile user by id", err);
        });
});

//GET USER RELATIONSHIP STATUS WITH OTHER USER
app.get(`/api/users/friendship/:id`, (req, res) => {
    console.log("other profile user", req.body);
    const viewedId = req.params.id;
    const loggedId = req.session.id;

    console.log(
        "viewedID and LoggedID in get request friendship: ",
        viewedId,
        loggedId
    );

    db.getFriendshipStatus(loggedId, viewedId)
        .then(({ rows }) => {
            console.log("Got relationship status:", rows);
            const data = rows[0] || null;
            let buttonText = "";

            if (data === null) {
                buttonText = "Make Friend Request";
            } else if (rows[0].accepted === true) {
                buttonText = "End Friendship";
            } else if (
                rows[0].accepted === false &&
                req.session.id === rows[0].recipient_id
            ) {
                buttonText = "Accept Friend Request";
            } else if (
                rows[0].accepted === false &&
                req.session.id === rows[0].sender_id
            ) {
                buttonText = "Cancel Friend Request";
            }

            res.json(buttonText);
        })
        .catch((err) => {
            console.log("err in getting relationship status", err);
        });
});

//POST FRIENDSHIP BUTTON
app.post("/friendship.json/:otherUserId", (req, res) => {
    console.log("friendship button req.body:", req.body);
    console.log("req.session friendship:", req.session);
    console.log("body:", req.body);
    const recipient_id = req.params.id;
    const sender_id = req.session.userId;
    const buttonText = req.body.message;

    console.log("sender id:", sender_id);
    console.log("reciepent id:", recipient_id);

    if (buttonText === "Make Friend Request") {
        db.insertFriendshipStatus(sender_id, recipient_id).then((data) => {
            console.log("updated Make Friend Request in db  successfully!");
            console.log(" friend req data:", data);
            res.json("Cancel Friend Request");
        });
    } else if (buttonText === "Cancel Friend Request") {
        db.deleteFriendshipstatus(sender_id, recipient_id).then((data) => {
            console.log("updated Cancel Friend Request in db successfully!");
            console.log(" friend req data:", data);
            res.json("Accept Friend Request");
        });
    } else if (buttonText === "Accept Friend Request") {
        db.updateFriendshipStatus(sender_id, recipient_id).then((data) => {
            console.log("updated Accept Friend Request in db successfully!");
            console.log(" friend req data:", data);
            res.json("End Friendship");
        });
    } else if (buttonText === "End Friendship") {
        db.deleteFriendshipstatus(sender_id, recipient_id)
            .then((data) => {
                console.log("updated ending friendship in db successfully!");
                console.log(" friend req data:", data);
                res.json("Make Friend Request");
            })
            .catch((err) => {
                console.log("error in ending friendship", err);
            });
    }
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

//
app.get("*", function (req, res) {
    console.log("I am loading here:", req.url, req.method);
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
