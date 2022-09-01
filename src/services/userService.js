const { User } = require('../database/models');
const generate = require('../auth/generateToken');

const getUserByEmail = async (email) => {
 try {
  const result = await User.findOne({ where: { email } });

  if (!result) return { code: 404, message: 'User not found!' };

  return { code: 200, message: 'User found!' };
 } catch (error) {
  return { code: 500, message: error.message };
 }
};

const addUser = async ({ displayName, email, password, image }) => {
 try {
  await User.create({ displayName, email, password, image });
  const token = generate.generateToken(email);

  return { code: 201, token };
 } catch (error) {
  return { code: 500, message: error.message };
 }
};

const findAll = async () => {
try {
 const users = await User.findAll({ attributes: { exclude: 'password' } });

 return { code: 200, data: users };
} catch (error) {
 return { code: 500, message: error.message };
}
};

const findByPk = async (id) => {
 try {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });

  if (!user) return { code: 404, message: 'User does not exist' };

  return { code: 200, data: user };
 } catch (error) {
  return { code: 500, message: error.message };
 }
};

module.exports = { getUserByEmail, addUser, findAll, findByPk };
