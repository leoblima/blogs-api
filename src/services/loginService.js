const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async ({ email }) => {
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
  const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);
  return { code: 200, token };
  } catch (error) {
    return { code: 500, message: error.message };
  }
};

module.exports = { login };