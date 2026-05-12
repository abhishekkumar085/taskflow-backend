'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      'project_members',
      {

        id: {
          type: Sequelize.UUID,

          defaultValue: Sequelize.literal(
            'gen_random_uuid()'
          ),

          allowNull: false,

          primaryKey: true,
        },

        project_id: {
          type: Sequelize.UUID,

          allowNull: false,

          references: {
            model: 'projects',
            key: 'id',
          },

          onUpdate: 'CASCADE',

          onDelete: 'CASCADE',
        },

        user_id: {
          type: Sequelize.UUID,

          allowNull: false,

          references: {
            model: 'users',
            key: 'id',
          },

          onUpdate: 'CASCADE',

          onDelete: 'CASCADE',
        },

        role: {
          type: Sequelize.ENUM(
            'OWNER',
            'MEMBER'
          ),

          defaultValue: 'MEMBER',
        },

        joined_at: {
          type: Sequelize.DATE,

          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },

        created_at: {
          allowNull: false,

          type: Sequelize.DATE,

          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },

        updated_at: {
          allowNull: false,

          type: Sequelize.DATE,

          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
        },
      }
    );

    // Prevent duplicate members
    await queryInterface.addConstraint(
      'project_members',
      {
        fields: [
          'project_id',
          'user_id',
        ],

        type: 'unique',

        name:
          'unique_project_member',
      }
    );

    // Indexes
    await queryInterface.addIndex(
      'project_members',
      ['project_id']
    );

    await queryInterface.addIndex(
      'project_members',
      ['user_id']
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable(
      'project_members'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_project_members_role";'
    );
  }
};