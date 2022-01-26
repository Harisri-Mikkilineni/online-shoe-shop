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

module.exports.updateBio = (id, bio) => {
    const q = `UPDATE users
    SET bio=$2
    WHERE id = $1
    RETURNING bio`;
    const params = [id, bio];
    return db.query(q, params);
};

module.exports.getRecentUsers = () => {
    const q = `SELECT * FROM users 
    ORDER by created_at DESC
    LIMIT 3`;
    return db.query(q);
};

module.exports.getUserbyMatchingName = (search) => {
    const q = `SELECT * FROM users WHERE first ILIKE $1 
    ORDER BY id desc`;
    const params = [search + "%"];
    return db.query(q, params);
};

module.exports.getFriendshipStatus = (recipient_id, sender_id) => {
    const q = `SELECT * FROM friendships 
    WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.insertFriendshipStatus = (sender_id, recipient_id) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id )
    VALUES($1, $2) 
    RETURNING sender_id, recipient_id, accepted`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.updateFriendshipStatus = (sender_id, recipient_id) => {
    const q = `UPDATE friendships
    SET accepted=true
    WHERE (recipient_id = $2 AND sender_id = $1) OR (recipient_id = $1 AND sender_id = $2)
    RETURNING sender_id, recipient_id`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.deleteFriendshipstatus = (sender_id, recipient_id) => {
    const q = `DELETE from friendships
    WHERE (recipient_id = $2 AND sender_id = $1) OR (recipient_id = $1 AND sender_id = $2)`;
    const params = [sender_id, recipient_id];
    return db.query(q, params);
};

module.exports.retrieveAllFriends = (userId) => {
    const q = `SELECT users.id, first, last, image_url, accepted
               FROM friendships
               JOIN users ON (accepted = false AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = true AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getRecentTenChatMessages = () => {
    const q = `SELECT user_id, message, chat_messages.created_at, first, last, url
                FROM chat_messages
                JOIN users ON user_id = users.id
                ORDER BY created_at DESC
                LIMIT 10`;
    return db.query(q);
};

module.exports.addMessagesToTheChat = (message, user_id) => {
    const q = `INSERT INTO chat_messages (message, user_id) Values ($1, $2) RETURNING message, user_id, created_at`;
    const params = [message, user_id];
    return db.query(q, params);
};
