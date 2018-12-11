const models = require('./models')
const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('RT005', 10); 
models.User.create({
    username: 'rt005',
    password: password,
    email: 'RT005@gmail.com',
    foto: 'aaaaa.jpg',
    level: 'RT'
}).then(user =>{
    console.log("Berhasil Membuat Data User",user.username)
}).catch(errerr => console.log(err))