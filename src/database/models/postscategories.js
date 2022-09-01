
module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories',
    {},
    { timestamps: false },
  );

  PostCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostCategories,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return PostCategories;
};