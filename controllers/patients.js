const Joi = require('joi')

const User = require('../models/user')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')

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
      const patient = await User.findById(req.params.patientId)
      res.status(200).json(patient)
    } catch(err) {
      next(err )
    }
  },

  // updatePatientProfile: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  //
  // doctorsList: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  //
  // appointments: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  //
  // appointmemnt: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
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
  // createAppointment: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // }

}
