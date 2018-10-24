const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  photo:String,
  profile_img: { data: Buffer, contentType: String },
  local_auth:{
    email:{
      type:String,
      lowercase:true
    },
    password:String
  },
  age:Number,
  address:{
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
  contact_number:String

})

const Patient = mongoose.model('patient',patientSchema)

module.exports = Patient
