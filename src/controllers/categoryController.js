const service = require('../services/categoryService');

const addCategory = async (req, res) => {
try {
 const { code, data, message } = await service.addCategory(req.body);

 if (message) return res.status(code).json({ message });

 return res.status(code).json(data);
} catch (error) {
 return res.status(500).json({ message: error.message });
}
};

module.exports = { addCategory };