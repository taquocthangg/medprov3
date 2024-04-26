'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class New extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            New.hasMany(models.Comment, {
                foreignKey: 'newsId',
                as: 'comments',
            });
            New.belongsTo(models.User, {
                foreignKey: 'author',
                as: 'authors', // Tùy chọn: Đặt tên cho mối quan hệ, giúp phân biệt với các mối quan hệ khác
            });
        }
    }
    New.init({
        image: DataTypes.TEXT,
        title: DataTypes.TEXT,
        description: DataTypes.TEXT,
        htmlContent: DataTypes.TEXT,
        markDownContent: DataTypes.TEXT,
        news_types: {
            type: DataTypes.ENUM('tindichvu', 'tinyte', 'yhocthuongthuc'),
            defaultValue: 'tindichvu',
        },
        author: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'New',
    });
    return New;
};