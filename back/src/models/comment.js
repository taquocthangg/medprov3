'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.New, {
                foreignKey: 'newsId',
                as: 'news', // Tùy chọn: Đặt tên cho mối quan hệ, giúp phân biệt với các mối quan hệ khác
            });
            Comment.belongsTo(models.User, {
                foreignKey: 'userID',
                as: 'user', // Tùy chọn: Đặt tên cho mối quan hệ, giúp phân biệt với các mối quan hệ khác
            });
        }
    }
    Comment.init({
        newsId: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        content: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};