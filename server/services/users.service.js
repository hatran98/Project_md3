const pool = require("../utils/database");
module.exports.findAll = () => {
  return pool.execute("SELECT * FROM users");
};

module.exports.findOne = (id) => {
  return pool.execute("SELECT * FROM users WHERE userId = ?", [id]);
};
module.exports.findOneByEmail = (email) => {
  return pool.execute("SELECT * FROM users WHERE email = ?", [email]);
};

module.exports.create = (username, email, password, address) => {
  return pool.execute(
    "INSERT INTO users(username, email, password , address) VALUES(?, ? , ? , ? )",
    [username, email, password, address]
  );
};

module.exports.update = (userId, newBlockValue) => {
  return pool.execute("UPDATE users SET block = ? WHERE userId = ?", [
    newBlockValue,
    userId,
  ]);
};
