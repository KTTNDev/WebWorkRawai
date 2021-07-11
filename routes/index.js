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
    var Docs = db.get('DocsWork');
    Docs.find({}, {}, function(err, Doc) {
        categories.find({}, {}, function(err, category) {
            res.render('index', {
                DocsWork: Doc,
                moment: moment
            });
        });
    });
});