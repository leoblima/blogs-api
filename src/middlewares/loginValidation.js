const userService = require('../services/userService');

const error = {
 isEmpty: 'Some required fields are missing',
 userInvalid: 'Invalid fields',
};

const empty = (value) => !value;

const userInvalid = async (email) => {
 try {
  const { code } = await userService.getUserByEmail(email);
  if (Number(code) === 200) return false;
  return true;
 } catch (e) {
  return { code: 500, message: e.message };
 }
};

const checkLogin = async (req, res, next) => {
 const { email, password } = req.body;
switch (true) {
 case empty(email): return res.status(400).json({ message: error.isEmpty });
 case empty(password): return res.status(400).json({ message: error.isEmpty });
 case await userInvalid(email): return res.status(400).json({ message: error.userInvalid });
 default:
  break;
}

next();
};

module.exports = { checkLogin };