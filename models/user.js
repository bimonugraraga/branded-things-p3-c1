'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/handlePassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: 'authorId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username Must Be Unique'
      },
      validate: {
        notNull:{
          msg: 'Username is required'
        },
        notEmpty:{
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email Must Be Unique'
      },
      validate: {
        notNull:{
          msg: 'Email is required'
        },
        notEmpty:{
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid Email Format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Password is required'
        },
        notEmpty:{
          msg: 'Password is required'
        },
        len: {
          args: [5, 15],
          msg:'Minimum Password Length is 5'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Role is required'
        },
        notEmpty:{
          msg: 'Role is required'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Phone Number is required'
        },
        notEmpty:{
          msg: 'Phone Number is required'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'Address is required'
        },
        notEmpty:{
          msg: 'Address is required'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (value) => {
        value.password = hashPassword(value.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};