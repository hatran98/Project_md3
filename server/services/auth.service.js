const bcrypt = require("bcrypt");
const usersService = require("./users.service");
const jwt = require("jsonwebtoken");

module.exports.signup = (username, email, password, address) => {
  // Mã hoá mật khẩu
  // chuẩn mã hoá MD5 (ngày xưa)
  // bcrypt chuẩn SHA 256
  let salt = bcrypt.genSaltSync(10);

  let hashPassword = bcrypt.hashSync(password, salt);

  return usersService.create(username, email, hashPassword, address);
};

module.exports.signin = async (email, password) => {
  try {
    let findUser = await usersService.findOneByEmail(email);
    let [rows] = findUser;
    if (rows.length === 0) {
      return {
        message: "User not found",
      };
    } else {
      // Lấy ra bản ghi user đã tìm thấy
      let hashPassword = rows[0].password;
      // So sánh MK mã hoá và MK được gửi lên
      let compare = bcrypt.compareSync(password, hashPassword);
      if (!compare) {
        return {
          message: "Password is incorrect",
        };
      } else {
        /////////////////////////////////
        let access_token = jwt.sign(
          { data: { id: rows[0].id, email: rows[0].email } },
          process.env.TOKEN_SECRET,
          { expiresIn: 1200 * 1200 }
        );
        return {
          message: "Sign in successfully",
          access_token,
          rows,
        };
      }
    }
  } catch (error) {
    return error;
  }
};
