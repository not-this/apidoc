const mongoose = require('mongoose')
const Schema = mongoose.Schema

const labsSchema = new Schema({
  name:String,
})

const Lab = mongoose.model('lab',labsSchema)

module.exports = Lab
