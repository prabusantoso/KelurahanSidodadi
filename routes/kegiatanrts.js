var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')

router.get('/',checkAuth, function(req, res) {
  const user = req.session.user
  models.User.findOne({where: {username: user.username}}).then(user => {
    models.Kegiatan.findAll({include: [{model: models.Rt}]}).then(kegiatanrts => {
        console.log(kegiatanrts)
      res.render('kegiatanrt/index', {
        pageTitle: 'Kegiatan',
        pageID: 'kegiatan',
        user: user,
        kegiatanrts: kegiatanrts
      });
    })
  }).catch(err => {
      res.redirect('/')
  })
});

router.post('/create',checkAuth,(req, res) => {
  const{namakegiatan,foto ,deskripsi} = req.body
  const userLogin = req.session.user
    console.log(userLogin)
    if(userLogin.level === 'Rt'){
        models.Rt.findOne({where: {userid: userLogin.id}}).then(rt => {    
            let createdby = rt.nama // ngambil dari data nama rt yg login
            let rtId = rt.id // ngambil dari data id rt yg login
            // buat data kegiatan 
            models.Kegiatan.create({namakegiatan,foto,deskripsi,createdby,rtId}).then(kegiatanrt => {
                res.redirect('/kegiatanrts')
            }).catch(err => {
                res.redirect('/kegiatanrts')
            })
        })
    }else{
        console.log('Admin tidak boleh membuat kegiatan!!!')
        res.redirect('/kegiatanrts/create')
    }
      
})
router.get('/create',checkAuth, (req,res) => {    
    const user = req.session.user
    console.log(user)
    res.render('kegiatanrt/create',{
    pageTitle: 'Kegiatan',
    user:user
  })
})

router.get('/delete/:id',checkAuth,(req,res) => {
  const kegiatanId = req.params.id
  models.Kegiatan.findOne({where:{id: kegiatanId}}).then(kegiatan => {
      return kegiatan.destroy()
  }).then(kegiatan => {
      res.redirect('/kegiatanrts')
  }).catch(err => {
      res.redirect('kegiatanrts')
  })
})

router.get('/edit/:id',checkAuth,(req,res) => {
  const kegiatanId = req.params.id
  const user = req.session.user
  models.Kegiatan.findOne({where: {id: kegiatanId}}).then(kegiatan => {    
      res.render('kegiatanrt/edit',{
          kegiatan: kegiatan,
          pageTitle: 'Kegiatan',
          user:user
    })
  }).catch(err => {
      console.log(err)
      res.redirect('/kegiatanrts')
  })    
})

router.post('/edit/:id',checkAuth,(req,res)=> {
    console.log(req);
  const kegiatanId = req.params.id
  const{namakegiatan,foto ,deskripsi,createdby,rtId} = req.body
  models.Kegiatan.findOne({where : {id: kegiatanId}}).then(kegiatan => {
      return kegiatan.update({
        namakegiatan,
        foto,
        deskripsi,
        createdby,
        rtId
      })
  }).then(updateKegiatan => {
      res.redirect('/kegiatanrts')
  }).catch(err => {
      console.log(err)
      res.redirect('/kegiatanrts')
  })
})


module.exports = router;
