var express = require('express');
var router = express.Router();
var sequelize = require('../db-connection');

/* GET users listing. */
router.get('/', function(req, res, next) {
    sequelize.query(`SELECT * FROM flservice.user`,
        { type: sequelize.QueryTypes.SELECT })
        .then(users => {
            res.send(users);

        }).catch(error =>{
            throw new Error(error);
        });
});

router.get('/fake', function(req, res, next) {
    res.send('fake');
});

module.exports = router;
