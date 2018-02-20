var sequelize = require('../db-connection');
const Sequelize = require('sequelize');

const user = sequelize.define('User', {
        user_id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true},
        user_login: Sequelize.STRING,
        user_password: Sequelize.STRING,
        user_name: Sequelize.STRING,
        user_surname: Sequelize.STRING,
        user_patronymic: Sequelize.STRING,
        user_email: Sequelize.STRING,
        user_phone: Sequelize.STRING,
        user_job: Sequelize.STRING,
        user_skype: Sequelize.STRING,
        user_telegram: Sequelize.STRING,
        user_website: Sequelize.STRING,
        user_flprofile: Sequelize.STRING,
        user_github: Sequelize.STRING,
        user_avatar: Sequelize.STRING,
        user_date_register: Sequelize.DATE
    },
    {tableName: 'user'});

module.exports = user;
