var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var async = require('async');
var url = 'mongodb://127.0.0.1:27017';
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function (req, res) {
  console.log(req.body)
  var username = req.body.name;
  var password = req.body.pwd;
  if (!username) {
    res.render('error', {
      message: "用户名不能为空",
      error: new Error('用户名不能为空')
    });
    return;
  }
  if (!password) {
    res.render('error', {
      message: "密码不能为空",
      error: new Error('密码不能为空')
    });
    return;
  }
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
      res.render('error', {
        message: "连接失败",
        error: err
      })
      return;
    }
    var db = client.db('project');

    db.collection('user').find({
      name: username,
      password: password
    }).toArray(function (err, data) {
      if (err) {
        res.render('error', {
          message: '查询失败',
          error: err
        })
      }
      else if (data.length <= 0) {
        res.render('error', {
          message: '登录失败',
          error: new Error('登录失败')
        })
      }
      else {
        res.cookie('nikename', data[0].nikename, { maxAge: 3600000 });
        console.log(data);
        res.redirect('/');
      }
      client.close();
    });
  });
});
module.exports = router;
