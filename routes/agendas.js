var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const {checkAuth} = require('../middlewares/auth')


router.post('/create',checkAuth,(req, res) => {
  const{tanggal ,waktuacara , keterangan} = req.body
  models.Agenda.create({tanggal ,waktuacara , keterangan}).then(agenda => {
      res.redirect('/')
  }).catch(err => {
      res.redirect('/agendas/create')
  })
})
router.get('/create',checkAuth, (req,res) => {
    const user = req.session.user
    res.render('agenda/create',{
    pageTitle: 'Agenda',
    user:user
  })
})

router.get('/delete/:id',checkAuth,(req,res) => {
  const agendaId = req.params.id
  models.Agenda.findOne({where:{id: agendaId}}).then(agenda => {
      return agenda.destroy()
  }).then(agenda => {
      res.redirect('/')
  }).catch(err => {
      res.redirect('/')
  })
})

router.get('/edit/:id',checkAuth,(req,res) => {
  const agendaId = req.params.id
  const user = req.session.user
  models.Agenda.findOne({where: {id: agendaId}}).then(agenda => {    
      res.render('agenda/edit',{
          agenda: agenda,
          pageTitle: 'Agenda',
          user:user
    })
  }).catch(err => {
      console.log(err)
      res.redirect('/')
  })    
})

router.post('/edit/:id',checkAuth,(req,res)=> {
  const agendaId = req.params.id
  const{tanggal ,waktuacara , keterangan} = req.body
  models.Agenda.findOne({where : {id: agendaId}}).then(agenda => {
      return agenda.update({
        tanggal,
        waktuacara,
        keterangan
      })
  }).then(updateAgenda => {
      // submit / save 
      res.redirect('/') // index 
  }).catch(err => {
      console.log(err)
      res.redirect('/agendas/edit/'+agendaId)
  })
})


module.exports = router;
