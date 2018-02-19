var express = require('express');
var router = express.Router();
var sequelize = require('../db-connection');

/* GET users listing. */
router.post('/checkLogin', function(req, res, next) {

    let authUser = req.body;
    console.log(authUser);
    res.send(authUser);
});

module.exports = router;