const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

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
  photo:String,
  profile_img: { data: Buffer, contentType: String },
  local_auth:{
    email:{
      type:String,
      // unique:true
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
  treatments:[String],
  speciality:[String],
  live:false
})

doctorSchema.pre('save', async function(next) {
  try {
    console.log('before hash: ',this.local_auth.password)
    // Generate a salt
    const salt = await bcrypt.genSalt(10)
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.local_auth.password, salt)
    // Re-assign hashed version over original, plain text password
    this.local_auth.password = passwordHash
    // next()
  } catch(error) {
    next(error);
  }
})
//
// doctorSchema.methods.isValidPassword = async function(newPassword) {
//   try {
//     return await bcrypt.compare(newPassword, this.local_auth.password);
//   } catch(error) {
//     throw new Error(error)
//   }
// }

const Doctor = mongoose.model('doctor',doctorSchema)

module.exports = Doctor
