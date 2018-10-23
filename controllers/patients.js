const Joi = require('joi')

const Doctor = require('../models/doctor')
const Patient = require('../models/patient')
const Booking = require('../models/booking')
module.exports = {
  newPatient: async (req,res,next)=>{
    try {
      console.log(req.body)
      const newPatient = new Patient(req.body)
      const patient = await newPatient.save()
      res.status(201).json(patient)
    } catch(err){
      next(err)
    }
  },

  getPatientProfile: async(req,res,next)=>{
    try {
      const patient = await Patient.findById(req.params.patientId)
      res.status(200).json(patient)
    } catch(err) {
      next(err )
    }
  },

  updatePatientProfile: async(req,res,next)=>{
    try {
      await Patient.findByIdAndUpdate(req.params.patientId, { $set:req.body })
      res.status(200).json({success:true})
    } catch(err) {
      next(err )
    }
  },

  doctorsList: async(req,res,next)=>{
    try {
      const doctors = await Doctor.find({},'firstName lastName degrees location')
      res.status(200).json(doctors)
    } catch(err) {
      next(err )
    }
  },
  doctorDetails: async(req,res,next)=>{
    try {
      const doctors = await Doctor.find({},'firstName lastName degrees about location medical_setups.name medical_setups.location')
      res.status(200).json(doctors)
    } catch(err) {
      next(err )
    }
  },
  uploadProfilePicture: async(req,res,next)=>{
    try {
      const patient = await Patient.findById(req.params.patientId)
      doctor.profile_img.data = Buffer(fs.readFileSync(req.file.path), 'base64')
      // yourBufferData.toString('base64')
      doctor.profile_img.contentType = 'image/png'
      await doctor.save()
      res.status(201).send({success:true})
    } catch(err) {
      next(err )
    }
  },
  // doctorsSetup: async(req,res,next)=>
  //   try {
  //     const doctors = await Doctor.find({},'firstName lastName')
  //     console.log(doctors)
  //     res.status(200).json(doctors)
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  appointments: async(req,res,next)=>{
    try {
      const patient = await Patient.findById(req.params.patientId).populate('bookings')
      res.status(200).json(patient.bookings)
    } catch(err) {
      next(err )
    }
  },
  //
  appointmemnt: async(req,res,next)=>{
    try {
      console.log("HERE")
      const {patientId,appointmentId} = req.params
      const patient = await Patient.findById(patientId).populate('bookings')
      console.log(patient)
    } catch(err) {
      next(err )
    }
  },
  //
  // updateAppointment: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  //
  cancelAppointment: async(req,res,next)=>{
    try {
      const {appointmentId,patientId} = req.params
      console.log("here")
      // const booking = await Booking.findByIdAndUpdate(id, {completed:true})
      const patient = await Patient.findById(patientId)
      const booking = patient.active_bookings.id(appointmentId)
      const doctorId = booking.doctorId

      await Doctor.findOneAndUpdate({ _id : doctorId },  { $pull: { active_bookings: { bookingId: booking.bookingId }}} )

      patient.active_bookings.pull(booking)
      await patient.save()

      await Booking.findOneAndUpdate({_id:booking.bookingId}, { $set: { completed: true }})
      res.status(200).send({success:true})
    } catch(err) {
      next(err )
    }
  },

  createAppointment: async(req,res,next)=>{
    try {
      const {patientId, doctorId} = req.params

      const patient = await Patient.findById(patientId)
      const doctor = await Doctor.findById(doctorId)

      const bookingObj = JSON.parse(JSON.stringify(req.body))
      bookingObj.patientId = patientId
      bookingObj.doctorId = doctorId

      const booking = new Booking(bookingObj)
      const book = await booking.save()

      patient.bookings.push(book._id)
      doctor.bookings.push(book._id)

      const bookingObjActive = JSON.parse(JSON.stringify(book))
      bookingObjActive.bookingId = bookingObjActive._id
      delete bookingObjActive._id

      patient.active_bookings.push(bookingObjActive)
      doctor.active_bookings.push(bookingObjActive)

      await patient.save()
      await doctor.save()

      res.status(200).json({success:true})
    } catch(err) {
      next(err )
    }
  }

}
