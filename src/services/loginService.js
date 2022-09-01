const generate = require('../auth/generateToken');

const login = async ({ email }) => {
  try {
  const token = generate.generateToken(email);
  return { code: 200, token };
  } catch (error) {
    return { code: 500, message: error.message };
  }
};

module.exports = { login };