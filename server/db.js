const spicedPg = require("spiced-pg"); //open line of communication to database
const database = "socialnetwork";
const username = "postgres";
const password = "postgres";

//let's create our line of communication to the database
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.addUsers = (firstName, lastName, email, hashedPw) => {
    const q = `INSERT INTO users(first, last, email, password)
    VALUES($1, $2, $3, $4) RETURNING id`;
    const params = [firstName, lastName, email, hashedPw];
    return db.query(q, params);
};
