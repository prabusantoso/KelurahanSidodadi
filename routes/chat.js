var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')

router.get('/',checkAuth, function(req, res) {

  res.render('chat', {
    pageTitle: 'Chat',
    pageID: 'chat'
  });

});

module.exports = router;
