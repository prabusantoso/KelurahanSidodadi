var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')


router.post('/create',checkAuth,(req, res) => {
  const{namapengumuman,tgldibuat,keterangan} = req.body
  models.Pengumuman.create({namapengumuman,tgldibuat,keterangan}).then(pengumuman => {
      res.redirect('/')
  }).catch(err => {
      res.redirect('/pengumumans/create')
  })
})
router.get('/create',checkAuth, (req,res) => {
    const user = req.session.user
    res.render('pengumuman/create',{
    pageTitle: 'Pengumuman',
    user:user
  })
})

router.get('/delete/:id',checkAuth,(req,res) => {
  const pengumumanId = req.params.id
  models.Pengumuman.findOne({where:{id: pengumumanId}}).then(pengumuman => {
      return pengumuman.destroy()
  }).then(pengumuman => {
      res.redirect('/')
  }).catch(err => {
      res.redirect('/')
  })
})

router.get('/edit/:id',checkAuth,(req,res) => {
  const pengumumanId = req.params.id
  const user = req.session.user
  models.Pengumuman.findOne({where: {id: pengumumanId}}).then(pengumuman => {    
      res.render('pengumuman/edit',{
          pengumuman: pengumuman,
          pageTitle: 'Pengumuman',
          user:user
    })
  }).catch(err => {
      console.log(err)
      res.redirect('/')
  })    
})

router.post('/edit/:id',checkAuth,(req,res)=> {
    console.log(req);
  const pengumumanId = req.params.id
  const{namapengumuman,tgldibuat,keterangan} = req.body
  models.Pengumuman.findOne({where : {id: pengumumanId}}).then(pengumuman => {
      return pengumuman.update({
        namapengumuman,
        tgldibuat,
        keterangan
      })
  }).then(updatePengumuman => {
      // submit / save 
      res.redirect('/') // index 
  }).catch(err => {
      console.log(err)
      res.redirect('/pengumumans/edit/'+pengumumanId)
  })
})


module.exports = router;
