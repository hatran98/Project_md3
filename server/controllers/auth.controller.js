const authService = require("../services/auth.service");
module.exports.signup = async (req, res) => {
  let { username, email, password, address } = req.body;
  try {
    await authService.signup(username, email, password, address);
    res.json({
      message: "Register successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.signin = async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await authService.signin(email, password);
    res.json(result);
  } catch (error) {
    res.json({
      error,
    });
  }
};
