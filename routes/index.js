var express = require('express');
var Homer = require('../model/homer_schema');
var mongoose = require('mongoose');
var Promise = new mongoose.Promise;

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/search', function(req, res, next) {
  var query = req.body;
  query.skip = query.skip ? query.skip : 0;
  query.limit = query.limit ? query.limit : 10;
  var condition = {};
  var promise = Homer.find(condition)
    .sort({"createDate":"desc"})
    .skip(parseInt(query.skip))
    .limit(parseInt(query.limit)).exec();
  promise.then(function(ret){
    res.json(ret);
  },function(err){
    res.json(500, {"error":err});
  });

});


router.get('/search', function(req, res, next) {
  var condition = {};
  var promise = Homer.find(condition)
    .sort({"createDate":"desc"})
    .skip(parseInt(0))
    .limit(parseInt(6)).exec();
  promise.then(function(ret){
    res.json(ret);
  },function(err){
    res.json(500, {"error":err});
  });

});


module.exports = router;
