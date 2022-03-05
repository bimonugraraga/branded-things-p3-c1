'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {foreignKey:'authorId'})
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Product.hasMany(models.Image, {foreignKey: 'productId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Product Name is required'
        },
        notEmpty:{
          msg: 'Product Name is required'
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Product Slug is required'
        },
        notEmpty:{
          msg: 'Product Slug is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Description is required'
        },
        notEmpty:{
          msg: 'Description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Price is required'
        },
        notEmpty:{
          msg: 'Price is required'
        }
      }
    },
    mainImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Main Image is required'
        },
        notEmpty:{
          msg: 'Main Image is required'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Category is required'
        },
        notEmpty:{
          msg: 'Category is required'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'User is required'
        },
        notEmpty:{
          msg: 'User is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};