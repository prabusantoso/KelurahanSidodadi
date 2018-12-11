var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')

/* GET users listing. */
router.get('/',checkAuth, function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/newaccount', (req,res) => {
  res.render('auth/newaccount',{
    pageTitle: 'NewAccount',
  })
})

router.post('/newaccount',(req, res)=>{
  let {username,password,email,level} = req.body
  password = bcrypt.hashSync(password, 10); 
  models.User.create({username,password,email,level}).then(user =>{
    return User.update({
      username,
      password,
      email,
      foto,
      level
    });
    res.redirect('/users/login')
  }).catch(err => {
    res.redirect('/users/login')
  })
});

router.get('/login',(req,res) =>{
  const user = req.session.user
  res.render('auth/login',{
    pageTitle: 'User',
    user:user,
  })
})

router.post('/login',(req,res) =>{
  const {username,password} = req.body
  models.User.findOne({
    where: {
      username:username,
    }
}).then(user =>{
  if (user != null){
  const checkPassword =  bcrypt.compareSync(password, user.password);
  if(checkPassword === true){
    req.session.user = {
      username: user.username,
      id: user.id
      }
      // console.log(req.session)
      res.redirect('/')
    }else{
    res.redirect('/users/login')
    }
  }else{
    res.redirect('/users/login')
  }
})
});

router.get('/logout',(req,res) => {
  req.session.destroy(function(err) {
    // cannot access session here
    if(err){
      console.log(err)
    }else{
      res.redirect('/users/login')
    }
  })
})

module.exports = router;
