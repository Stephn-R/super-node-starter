'use strict';

/*===============================
=            MODULES            =
===============================*/

import Sequelize from 'sequelize';

/*----------- MODELS -----------*/

/*=====  End of MODULES  ======*/

exports.Users = function(sequelize) {

  const tablename = 'users';

  const User = sequelize.define(tablename, {
    id: {
      type:          Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey:    true
    },
    email: {
      type:      Sequelize.STRING,
      allowNull: true,
      unique:    true,
      validate:  {
        isEmail: true
      }
    },
    password: {
      type:      Sequelize.STRING,
      allowNull: true
    },
    token: {
      type:      Sequelize.UUID,
      allowNull: false,
      unique:    true,
      validate:  {
        isUUID: 4
      }
    },
    firstName: {
      type:      Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type:      Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      type:         Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull:    false
    },
    updatedAt: {
      type:         Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull:    false
    }
  }, {
    timestamps: true
  });

  /*=============================
  =            HOOKS            =
  =============================*/

  User.addHook('afterCreate', 'postCreate', user => {
    // do something
  });

  return User;
};
