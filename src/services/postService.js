const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory } = require('../database/models');

const sequelize = new Sequelize(config.development);

const addPost = async ({ title, content, categoryIds }, user) => {
  console.log(user.dataValues.id);
  const userId = user.dataValues.id;
  const NOW = new Date();
try {
 const newPost = await sequelize.transaction(async (t) => {
  // Adicionar o post na tabela BlogPost
  const newPostInfo = await BlogPost.create(
   { title, content, userId, published: NOW, updated: NOW }, { transaction: t },
   );
  
  // Pegar o id do novo post
  const postId = newPostInfo.id;

  // Postar todas as relações dos post com as categorias
  await Promise.all(categoryIds.map(async (categoryId) => {
   await PostCategory.create({ postId, categoryId }, { transaction: t });
  }));
  
  // retornar as informações do newPostInfo
  return newPostInfo;
 });

 return { code: 201, data: newPost };
} catch (error) {
 return { code: 500, message: error.message };
}
};

module.exports = { addPost };