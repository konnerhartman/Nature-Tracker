// import models
const User = require('./User');
const Animal = require('./Animal');
const Category = require('./Category');

// create table associations for User and Animal
User.hasMany(Animal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Animal.belongsTo(User, {
  foreignKey: 'user_id'
});

// create table associations for Animal and Category
Animal.belongsTo(Category, {
    foreignKey: 'category_id'
  });
Category.hasMany(Animal, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });


module.exports = { User, Animal, Category };