const userService = require('../services/userService');

const error = {
 nameMinLength: '"displayName" length must be at least 8 characters long',
 emailInvalid: '"email" must be a valid email',
 passwordMinLength: '"password" length must be at least 6 characters long',
 userExistent: 'User already registered',
};

const hasMinLength = (string, minLength) => string.length < minLength;

const hasEmailFormat = (email) => {
 const mailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
 if (email.match(mailFormat)) return false;

 return true;
};

const userExist = async (email) => {
 try {
  const { code } = await userService.getUserByEmail(email);
  if (Number(code) === 200) return true;
  return false;
 } catch (e) {
  return { code: 500, message: e.message };
 }
};

const checkUser = async (req, res, next) => {
 const { email, password, displayName } = req.body;
switch (true) {
 case hasMinLength(password, 6): return res.status(400).json({ message: error.passwordMinLength });
 case hasMinLength(displayName, 8): return res.status(400).json({ message: error.nameMinLength });
 case hasEmailFormat(email): return res.status(400).json({ message: error.emailInvalid });
 case await userExist(email): return res.status(409).json({ message: error.userExistent });
 default:
  break;
}

next();
};

module.exports = { checkUser };