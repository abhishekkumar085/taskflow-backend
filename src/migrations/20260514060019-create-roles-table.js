'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      'roles',
      {

        id: {
          type: Sequelize.UUID,
          defaultValue:
            Sequelize.literal(
              'gen_random_uuid()'
            ),
          allowNull: false,
          primaryKey: true,
        },


        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },

        created_by: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },
      }
    );


    // =========================
    // INDEX
    // =========================

    await queryInterface.addIndex(
      'roles',
      ['name']
    );
  },



  async down(queryInterface) {

    await queryInterface.dropTable(
      'roles'
    );
  },
};