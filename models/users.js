"use strict";
const bcryptjs = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      is_admin: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeCreate: async (user) => {
          try {
            const salt = await bcryptjs.genSalt();
            const passCrypted = bcryptjs
              .hashSync(user.password, salt)
              .toString();
            user.password = passCrypted;
          } catch (err) {
            throw err;
          }
        },
        beforeUpdate: async (user) => {
          try {
            const salt = await bcryptjs.genSalt();
            const passCrypted = bcryptjs
              .hashSync(user.password, salt)
              .toString();
            user.password = passCrypted;
          } catch (err) {
            throw err;
          }
        },
      },
    }
  );
  return users;
};
