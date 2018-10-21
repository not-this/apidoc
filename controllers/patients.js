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

  // getPatientProfile: async(req,res,next)=>{
  //   try {
  //     const patient = await User.findById(req.params.patientId)
  //     res.status(200).json(patient)
  //   } catch(err) {
  //     next(err )
  //   }
  // },

  // updatePatientProfile: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  //
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
      res.status(200).json(patient)
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
  // cancelAppointment: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  //
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
      // console.log(book._id)
      patient.bookings.push(book._id)
      doctor.bookings.push(book._id)
      await patient.save()
      await doctor.save()
    } catch(err) {
      next(err )
    }
  }

}
