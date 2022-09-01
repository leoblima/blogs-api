const { User } = require('../database/models');

const getUserByEmail = async (email) => {
 try {
  console.log('Antes de tentar encontrar');
  const result = await User.findOne({ where: { email } });

  if (!result) return { code: 404, message: 'User not found!' };

  return { code: 200, message: 'User found!' };
 } catch (error) {
  return { code: 500, message: error.message };
 }
};

module.exports = { getUserByEmail };
