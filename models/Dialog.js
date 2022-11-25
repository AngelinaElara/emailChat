const {Schema, model, Types} = require('mongoose')

const Dialog = new Schema({
  text: {type: String, required: true},
  header: {type: String, required: true},
  date: {type: Date, requires: true, default: Date.now},
  sender: {type: String, required: true},
  recipient: {type: String, required: true}
}, {versionKey: false})

module.exports = model('Dialog', Dialog)  