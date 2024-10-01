'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ROLES, USER_LOGIN_TYPE } = require('../../constants/appConstants.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: () => Date.now(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: () => Date.now(),
      },
      unique_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(Object.values(ROLES)),
        defaultValue: ROLES.USER,
        allowNull: false,
      },
      user_login_type: {
        type: Sequelize.ENUM(Object.values(USER_LOGIN_TYPE)),
        defaultValue: USER_LOGIN_TYPE.EMAIL_PASSWORD,
        allowNull: false,
      },
      custom_domain: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      avatar_url: {
        type: Sequelize.TEXT('medium'),
        allowNull: true,
      },
      next_action: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      comment: {
        type: Sequelize.TEXT('medium'),
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
