const service = require('../services/userService');

const addUser = async (req, res) => {
  try {
   const { code, token } = await service.addUser(req.body);
 
   if (code !== 201) return res.status(code).json({ message: 'Something went wrong' });

   return res.status(code).json({ token });
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

const findAll = async (_req, res) => {
 try {
  const { code, data } = await service.findAll();
  return res.status(code).json(data);
 } catch (error) {
  return res.status(500).json({ message: error.message });
 }
};

module.exports = { addUser, findAll };