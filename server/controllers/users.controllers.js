const usersService = require("../services/users.service");

module.exports.findAll = async (req, res) => {
  try {
    let data = await usersService.findAll();
    let [rows] = data;

    res.json({
      status: "success",
      users: rows,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.findOne = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await usersService.findOne(id);
    let [rows] = data;
    if (rows.length === 0) {
      res.json({
        message: "User not found",
      });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.create = async (req, res) => {
  let { username, email, password, address } = req.body;
  // validate email, password

  try {
    await usersService.create(username, email, password, address);
    res.json({
      message: "Create user successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports.Block = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usersService.findOne(userId);
    const [row] = user[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newBlockValue = row.block === 1 ? 0 : 1;
    await usersService.update(userId, newBlockValue);
    return res
      .status(200)
      .json({ message: "User block status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
