var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')

router.get('/',checkAuth, function(req, res) {
    const user = req.session.user
    models.Agenda.findAll().then(agendas => {
        models.Pengumuman.findAll().then(pengumumans => {
            res.render('index', {
                pageTitle: 'Home',
                pageID: 'home',
                user: user,
                agendas: agendas,
                pengumumans: pengumumans
            });
        });
    })  

});


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home/home');
});
module.exports = router;
