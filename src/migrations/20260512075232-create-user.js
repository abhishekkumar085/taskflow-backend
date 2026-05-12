'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {

      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM('ADMIN', 'MEMBER'),
        defaultValue: 'MEMBER',
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_role";'
    );

  },

};