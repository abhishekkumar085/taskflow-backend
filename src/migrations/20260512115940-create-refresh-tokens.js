'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      'refresh_tokens',
      {

        id: {
          type: Sequelize.UUID,

          defaultValue:
            Sequelize.literal(
              'gen_random_uuid()'
            ),

          primaryKey: true,
        },

        user_id: {
          type: Sequelize.UUID,

          allowNull: false,

          references: {
            model: 'users',
            key: 'id',
          },

          onDelete: 'CASCADE',
        },

        token: {
          type: Sequelize.TEXT,

          allowNull: false,
        },

        expires_at: {
          type: Sequelize.DATE,

          allowNull: false,
        },

        is_revoked: {
          type: Sequelize.BOOLEAN,

          defaultValue: false,
        },

        created_at: {
          type: Sequelize.DATE,

          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },

        updated_at: {
          type: Sequelize.DATE,

          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },
      }
    );


    await queryInterface.addIndex(
      'refresh_tokens',
      ['user_id']
    );

    await queryInterface.addIndex(
      'refresh_tokens',
      ['token']
    );
  },

  async down(queryInterface) {

    await queryInterface.dropTable(
      'refresh_tokens'
    );
  },
};