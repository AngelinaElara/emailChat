const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, require: true},
})
 
module.exports = model('User', schema)  