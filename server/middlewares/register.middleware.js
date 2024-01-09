module.exports.isReg = (req, res, next) => {
  const { username, email, password, address } = req.body;
  const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  try {
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Invalid username.' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // Continue processing if all validations pass
    console.log('Registration data is valid:', req.body);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
