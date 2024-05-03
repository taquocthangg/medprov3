'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('News', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.TEXT,
            },
            title: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            htmlContent: {
                type: Sequelize.TEXT,
            },
            markDownContent: {
                type: Sequelize.TEXT,
            },
            news_types: {
                type: Sequelize.ENUM('tindichvu', 'tinyte', 'yhocthuongthuc'),
                defaultValue: 'tindichvu',
            },
            author: {
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
        return queryInterface.dropTable('News');
    },
};
