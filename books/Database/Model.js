const mongoose = require('mongoose')
var none = "none"
const bookschema = new mongoose.Schema({
    bookname : {type : String , required : true},
    takenby : {type : String, defualt : none}
})

const mongobook = mongoose.model('mongobook',bookschema)

module.exports = mongobook