'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Rate extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Rate.belongsTo(models.User, {
                foreignKey: 'userID',
                as: 'user', // Tùy chọn: Đặt tên cho mối quan hệ, giúp phân biệt với các mối quan hệ khác
            });
            Rate.belongsTo(models.User, {
                foreignKey: 'evaluatedID',
                as: 'evaluated', // Tùy chọn: Đặt tên cho mối quan hệ, giúp phân biệt với các mối quan hệ khác
            });
        }
    }
    Rate.init({
        evaluatedID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        rates: DataTypes.TEXT,
        review: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Rate',
    });
    return Rate;
};