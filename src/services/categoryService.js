const { Category } = require('../database/models');

const addCategory = async ({ name }) => {
 try {
  const postId = await Category.create({ name });

  return { code: 201, data: postId };
 } catch (error) {
  return { code: 500, message: error.message };
 }
};

module.exports = { addCategory };