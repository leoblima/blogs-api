const BlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define("BlogPosts", {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true}
  },
  {
    timestamps: false, 
    tableName: 'BlogPosts',
    underscored: true,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    })
  }
  return BlogPosts;
};

module.exports = BlogPosts;