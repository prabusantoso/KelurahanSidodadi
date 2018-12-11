var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')

router.get('/',checkAuth, function(req, res) {
  const user = req.session.user
  res.render('visimisi', {
    pageTitle: 'Visimisi',
    pageID: 'visimisi',
    user:user
  });

});


module.exports = router;
