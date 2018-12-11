const models = require('./models');

models.Kegiatan.findAll({include: [{model: models.Rt}]}).then(kegiatans => {
kegiatans.forEach(kegiatans =>{
    console.log(`
    id : ${kegiatans.id}
    namakegiatan : ${kegiatans.namakegiatan}
    foto : ${kegiatans.foto}
    deskripsi : ${kegiatans.deskripsi}
    createdby : ${kegiatans.createdby}
    rtId : ${kegiatans.Rt.rtId}
    `)
})
}).catch((err)=> console.log(err))