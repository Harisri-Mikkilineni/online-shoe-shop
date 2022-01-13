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

module.exports.getUserByEmail = (email) => {
    const q = `SELECT *
     FROM users
     WHERE users.email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserById = (id) => {
    const q = `SELECT *
     FROM users
     WHERE users.id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addResetPwCode = (email, code) => {
    const q = `INSERT INTO password_reset_codes (email, code)
    VALUES($1, $2) RETURNING code`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.getResetPwCode = () => {
    const q = `SELECT * 
     FROM password_reset_codes
      WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`;
    return db.query(q, []);
};

module.exports.updateUserPw = (email, password) => {
    const q = `UPDATE users
    SET password=$2
    WHERE email = $1`;
    const params = [email, password];
    return db.query(q, params);
};

module.exports.updateImage = (id, image_url) => {
    const q = `UPDATE users
    SET image_url=$2
    WHERE id = $1
    RETURNING image_url`;
    const params = [id, image_url];
    return db.query(q, params);
};
