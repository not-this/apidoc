const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorBookingSchema = new Schema({
  patient: {
    type:Schema.Types.ObjectId,
    ref:'patient'
  },
  date: Date,
  slot: Number,
  place: String,
  description: String,
  completed: false
})

const medical_setupGeoSchema= new Schema({
  type:{
    type:String,
    defualt:"Point"
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
})

const doctorSchema = new Schema({
  firstName:String,
  lastName:String,
  local_auth:{
    email:{
      type:String,
      unique:true
    },
    password:{
      type:String
    }
  },
  bookings:[{
    type:Schema.Types.ObjectId,
    ref:'booking'
  }],
  active_bookings:[{
    bookingId:{
      type:Schema.Types.ObjectId,
    },
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
  }],
  medical_setups:[{
    name:{
      type:String
    },
    address_lines:[String],
    location:medical_setupGeoSchema,
    contact_numbers:[{
      type:Number
    }],
    timings:[{
      type:String
    }],
    days:[String],
    slots:[String],
  }],
  degrees:[String],
  about:String,
  achievements:String,
  live:false
})

const Doctor = mongoose.model('doctor',doctorSchema)

module.exports = Doctor
