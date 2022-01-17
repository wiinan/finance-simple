"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("payments", {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["Debit", "Credit", "Pix"],
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        default: 0,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("payments");
  },
};
