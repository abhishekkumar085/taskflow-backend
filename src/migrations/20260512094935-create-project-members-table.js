'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'project_members',
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
        project_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'projects',
            key: 'id',
          },
          onDelete: 'CASCADE',
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
        role_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'id',
          },
          onDelete: 'RESTRICT',
        },
        added_by: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        joined_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue:
            Sequelize.literal(
              'CURRENT_TIMESTAMP'
            ),
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
    // UNIQUE CONSTRAINT
    // =========================

    await queryInterface.addConstraint(
      'project_members',
      {
        fields: [
          'project_id',
          'user_id',
        ],
        type: 'unique',
        name:
          'unique_project_user',
      }
    );


    // =========================
    // INDEXES
    // =========================

    await queryInterface.addIndex(
      'project_members',
      ['project_id']
    );

    await queryInterface.addIndex(
      'project_members',
      ['user_id']
    );

    await queryInterface.addIndex(
      'project_members',
      ['role_id']
    );
  },



  async down(queryInterface) {

    await queryInterface.dropTable(
      'project_members'
    );
  },
};