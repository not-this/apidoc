const mongoose = require('mongoose')
const Schema = mongoose.Schema


const bookingSchema = new Schema({
  bookingType: String, // video/call consultation, offline service, purchase(medicines)
  patientId: {
    type:Schema.Types.ObjectId,
  },
  doctorId: {
    type:Schema.Types.ObjectId,
  },
  status:{
    code:{
      type:Number
    },
    message:{
      type:String
    }
  },
  time: Date,
  Length: Number,
  description: String,
  completed: false
})

const Booking = mongoose.model('booking',bookingSchema)

module.exports = Booking
