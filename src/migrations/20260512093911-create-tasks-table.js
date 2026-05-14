'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('tasks', {

      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          'TODO',
          'IN_PROGRESS',
          'DONE'
        ),

        defaultValue: 'TODO',
      },

      priority: {
        type: Sequelize.ENUM(
          'LOW',
          'MEDIUM',
          'HIGH'
        ),

        defaultValue: 'MEDIUM',
      },

      due_date: {
        type: Sequelize.DATE,
        allowNull: true,
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
      assigned_to: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      assigned_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Indexes
    await queryInterface.addIndex(
      'tasks',
      ['project_id']
    );

    await queryInterface.addIndex(
      'tasks',
      ['assigned_to']
    );

    await queryInterface.addIndex(
      'tasks',
      ['status']
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('tasks');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_tasks_status";'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_tasks_priority";'
    );
  }
};