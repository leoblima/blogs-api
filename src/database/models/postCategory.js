
module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategory',
    {
      postId: { type: DataTypes.INTEGER, foreignKey: true},
      categoryId: { type: DataTypes.INTEGER, foreignKey: true},
    },
    { timestamps: false },
  );

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategories,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategories,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return PostCategories;
};