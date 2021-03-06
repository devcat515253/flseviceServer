var express = require('express');
var router = express.Router();
var sequelize = require('../db-connection');
var user = require('../table_model/user-table');
var bcrypt = require('bcrypt');


/* GET users listing. */
router.post('/newUser', function (req, res, next) {
    let newUser = req.body;

    // res.send(newUser);
    console.log(newUser);

    /* create hashed password */
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        // Store hash in database
        newUser.password = hash;
        console.log(newUser.password);

        sequelize.query(`INSERT INTO flservice.user(
            user_login,
            user_password,
            user_email)
        VALUES(
            :login,
            :password,
            :email
        )`,
            {
                replacements: {
                    login: newUser.login,
                    email: newUser.email,
                    password: newUser.password,
                },
                type: sequelize.QueryTypes.INSERT
            }).then(id_user => {
                console.log(id_user);
                let status = {
                    status : 'okay'
                };
                res.send(status);

        }).catch(error => {
            let status = {
                status : 'error'
            };
            res.send(status);
            throw new Error(error);
        });
    });

});

router.post('/checkLogin', function (req, res, next) {
    let newUser = req.body;

    // res.send(newUser);
    console.log(newUser);

    sequelize.query(`SELECT user_login FROM flservice.user WHERE user_login=:login LIMIT 1`,
        {
            replacements: {
                login: newUser.login
            },
            type: sequelize.QueryTypes.SELECT
        }).then(logins => {
        console.log(logins);

        if  (logins.length > 0) {
            res.send(false);
        }else{
            res.send(true);
        }

    }).catch(error => {
        throw new Error(error);
    });


});




module.exports = router;