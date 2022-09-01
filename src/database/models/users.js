const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, 
  {
    timestamps: false, 
    tableName: 'Users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPosts, {
      foreignKey: 'userId', as: 'BlogPosts'
    });
  }
  return User;
};

module.exports = User;