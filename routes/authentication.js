var express = require('express');
var router = express.Router();
var sequelize = require('../db-connection');
var user = require('../table_model/user-table');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/checkAuth', function(req, res, next) {
    let authUser = req.body;

    sequelize.query(`SELECT *  FROM  flservice.user where user_login=:login limit 1`,
        {replacements: {login: authUser.login}, type: sequelize.QueryTypes.SELECT}).then(users => {



        if (users.length > 0) {
            // To verify the password later on:
            bcrypt.compare(authUser.password, users[0].user_password, function (err1, res1) {
                if (res1) {
                    // Passwords match
                    console.log('ok админ найден');
                    console.log(res1);
                    //res.send( users[0]);
                    setTimeout(function () {
                        res.send( users[0]);
                    },5000);
                    return;
                } else {
                    // Passwords don't match
                    console.log('error админа с таким логином паролем не существует');
                    setTimeout(function () {
                        res.send([]);
                    },5000);
                    //res.send( []);
                    return;
                }
            });
        } else {
            //res.send([]);
            setTimeout(function () {
                res.send( []);
            },5000);
        }

    }).catch(error => {
        throw new Error(error);
    });

});

module.exports = router;