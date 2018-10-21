const mongoose = require('mongoose')
const Schema = mongoose.Schema


const bookingSchema = new Schema({
  patientId: {
    type:Schema.Types.ObjectId,
  },
  doctorId: {
    type:Schema.Types.ObjectId,
  },
  date: Date,
  slot: Number,
  place: String,
  description: String,
  completed: false
})

const Booking = mongoose.model('booking',bookingSchema)

module.exports = Booking
