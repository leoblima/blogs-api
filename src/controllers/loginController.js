const service = require('../services/loginService');

const login = async (req, res) => {
try {
  const { code, token, message } = await service.login(req.body);
  if (message) return res.status(code).json(message);

  return res.status(code).json({ token });
} catch (error) {
 return res.status(500).json({ error: error.message });
}
};

module.exports = { login };