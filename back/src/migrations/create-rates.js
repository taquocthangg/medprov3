'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Rates', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            evaluatedID: {
                type: Sequelize.TEXT,
            },
            userID: {
                type: Sequelize.TEXT,
            },
            rates: {
                type: Sequelize.TEXT,
            },
            review: {
                type: Sequelize.TEXT,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Rates');
    },
};
