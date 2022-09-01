const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    name: DataTypes.STRING,
  }, 
  {
    timestamps: false, 
    tableName: 'Categories',
    underscored: true,
  });

  return Categories;
};

module.exports = Categories;