const service = require('../services/categoryService');

const error = {
 isEmpty: 'Some required fields are missing',
 userInvalid: 'Invalid fields',
 catIsEmpty: '"categoryIds" not found',
};

const empty = (value) => !value;

const categoryExist = async (id) => {
 try {
  const { code } = await service.findByPk(id);
  console.log(code);
  if (Number(code) === 200) return false;
  return true;
 } catch (e) {
  return { code: 500, message: e.message };
 }
};

const checkCategory = async (categoryIds) => {
  const isValid = await Promise.all(categoryIds.map(async (categoryId) => {
  const hasCat = await categoryExist(categoryId);
  return hasCat;
 }));
  console.log(isValid.filter((err) => err)[0]);
 return isValid.filter((err) => err)[0];
};

const checkPost = async (req, res, next) => {
 const { title, content, categoryIds } = req.body;
 switch (true) {
  case empty(title): return res.status(400).json({ message: error.isEmpty });
  case empty(content): return res.status(400).json({ message: error.isEmpty });
  case empty(categoryIds): return res.status(400).json({ message: error.catIsEmpty });
  case await checkCategory(categoryIds): return res.status(400).json({ message: error.catIsEmpty });
  default:
   break;
 }

 next();
};

module.exports = { checkPost };