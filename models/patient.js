const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientBookingSchema = new Schema({
  doctor: {
    type:Schema.Types.ObjectId,
    ref:'doctor'
  },
  date: Date,
  slot: Number,
  place: String,
  description: String,
  completed: false
})

const patient_current_locationGeoSchema= new Schema({
  type:{
    type:String,
    defualt:"Point"
  },
  coordinated:{
    type:[Number],
    index:"2dsphere"
  }
})

const patientSchema = new Schema({
  firstName:{
    type:String
    // required:true
  },
  lastName:{
    type:String
    // required:true
  },
  local_auth:{
    email:{
      type:String,
      lowercase:true
    },
    password:String
  },
  Age:Number,
  Address:{
    address_lines:[String],
    city:{
      type: String
    },
    pin_code:Number,
  },
  current_location:patient_current_locationGeoSchema,
  bookings:[{
    type:Schema.Types.ObjectId,
    ref:'booking'
  }],
  contact_number:{
    type:Number
    // Required:true
  }

})

const Patient = mongoose.model('patient',patientSchema)

module.exports = Patient
