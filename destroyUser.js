const models = require('./models')


models.User.FindOne({where:{nama:'RT005'}}).then(user =>{
user.destroy()
}).then(user =>{
console.log("Data User Terhapus")
}).catch(err =>console.log(err))