"use strict";
const { v4: uuid } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  payments.init(
    {
      type: { type: DataTypes.STRING(6), allowNull: false },
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "payments",
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeCreate: async (payment) => {
          payment.id = uuid();
        },
      },
    }
  );
  return payments;
};
