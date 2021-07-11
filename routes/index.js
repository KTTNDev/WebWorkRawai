var express = require('express');
var router = express.Router();
var moment = require('moment');
var $ = require("jquery");

var {
    check,
    validationResult
} = require('express-validator');

//Connect DB
var mongodb = require('mongodb');
var db = require('monk')('localhost:27017/DBworkrawai');
/* GET home page. */


router.get('/', function(req, res, next) {
    var Docs = db.get('DocsWorks');
    Docs.find({}, {}, function(err, Doc) {
        res.render('index', {
            DocsWorks: Doc,
            moment: moment
        });
    });
});


router.get('/Select-Print/:id', function(req, res, next) {
    var Docs = db.get('DocsWorks');
    Docs.find(req.params.id, {}, function(err, DocsWork) {
        res.render('Select-Print', {
            DocsWorks: DocsWork
        });
    })
});

module.exports = router;