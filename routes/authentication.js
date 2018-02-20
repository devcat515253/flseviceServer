var express = require('express');
var router = express.Router();
var sequelize = require('../db-connection');
var user = require('../table_model/user-table');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/checkLogin', function(req, res, next) {
    let authUser = req.body;

    sequelize.query(`SELECT *  FROM  flservice.user where user_login=:login AND user_password=:password   limit 1`,
        {replacements: {login: authUser.login, password: authUser.password}, type: sequelize.QueryTypes.SELECT}).then(users => {



        if (users.length > 0) {
            res.send(users);

            // To verify the password later on:

            // bcrypt.compare(pas, user.login_admin_pas, function (err1, res1) {
            //     if (res1) {
            //         // Passwords match
            //         console.log('ok админ найден');
            //         console.log(res1);
            //
            //         if (res) {
            //             user.token = crypto.randomBytes(64).toString('hex');
            //             res.send(user);
            //             return;
            //         }
            //
            //     } else {
            //         // Passwords don't match
            //         console.log('error админа с таким логином паролем не существует');
            //         res.send({});
            //         return;
            //     }
            // });
        } else {
            res.send([]);
        }

        // let user = {};
        // if (users.length > 0) {
        //     user = users[0];
        //
        //     // To verify the password later on:
        //     bcrypt.compare(pas, user.login_admin_pas, function (err1, res1) {
        //         if (res1) {
        //             // Passwords match
        //             console.log('ok админ найден');
        //             console.log(res1);
        //
        //             if (res) {
        //                 user.token = crypto.randomBytes(64).toString('hex');
        //                 res.send(user);
        //                 return;
        //             }
        //
        //         } else {
        //             // Passwords don't match
        //             console.log('error админа с таким логином паролем не существует');
        //             res.send({});
        //             return;
        //         }
        //     });
        //
        // }
        // else {
        //     res.send({});
        // }


    }).catch(error => {
        throw new Error(error);
    });

});

module.exports = router;