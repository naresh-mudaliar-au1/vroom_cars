"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("service_bookings", "status", {
      type: Sequelize.STRING,
      default: "Pending",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("service_bookings", "status");
  },
};
