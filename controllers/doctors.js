const Joi = require('joi')

const User = require('../models/user')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')
const Booking = require('../models/booking')

module.exports = {

  newDoctor: async (req,res,next)=>{
    try {
      console.log(req.body)
      const newDoc = new Doctor(req.body)
      const doctor = await newDoc.save()
      res.status(201).json(doctor)
    } catch(err){
      next(err)
    }
  },

  getDoctorProfile: async(req,res,next)=>{
    try {
      const doctor = await User.findById(req.params.doctorId)
      res.status(200).json(doctor)
    } catch(err) {
      next(err )
    }
  },

  updateDoctorProfile: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.params.doctorId)
      // const address = doc.medical_setups.id(req.params.setupId)
      doc.set(req.body)
      await doc.save()
      res.status(200).json(doc)
    } catch(err) {
      next(err )
    }
  },

  getAppointment: async(req,res,next)=>{
    try {
      const doctor = await Doctor.findById(req.params.doctorId)
      res.status(200).json(doctor.active_bookings.id(req.params.appointmentId))
    } catch(err) {
      next(err )
    }
  },

  // updateAppointment: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  cancelAppointment: async(req,res,next)=>{
    try {
      const {appointmentId,doctorId} = req.params
      const doctor = await Doctor.findById(doctorId)
      const booking = doctor.active_bookings.id(appointmentId)
      const patientId = booking.patientId
      Patient.findOneAndUpdate({ _id : patientId },  { $pull: { active_bookings: { bookingId: booking.bookingId }}} )
      doctor.active_bookings.pull(booking)
      await doctor.save()
      await Booking.findOneAndUpdate({_id:booking.bookingId}, { $set: { completed: true }})
      res.status(200).send({success:true})
    } catch(err) {
      next(err )
    }
  },
  appointments: async(req,res,next)=>{
    try {
      const doctor = await Doctor.findById(req.params.doctorId)
      console.log(doctor.active_bookings)
      res.status(200).json(doctor.active_bookings)
    } catch(err) {
      next(err )
    }
  },
  createMedicalSetup: async(req,res,next)=>{
    try {
      const doctorId = req.params.doctorId
      const newSetup = req.body
      const doctor = await Doctor.findById(doctorId)
      doctor.medical_setups.push(newSetup)
      res.status(200).json({success:true})
    } catch(err) {
      next(err )
    }
  },
  listMedicalSetups: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.params.doctorId)
      res.status(200).json(doc.medical_setups)
    } catch(err) {
      next(err )
    }
  },
  getMedicalSetup: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.params.doctorId)
      const medical_setup = doc.medical_setups.id(req.params.setupId)
      res.status(200).json(medical_setup)
    } catch(err) {
      next(err )
    }
  },
  updateMedicalSetup: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.params.doctorId)
      const address = doc.medical_setups.id(req.params.setupId)
      address.set(req.body)
      await doc.save()
      res.status(200).send({ doc })
      // Promise version -

      // Doctor.findById(req.params.doctorId)
      //   .then((doc) => {
      //     const address = doc.medical_setups.id(req.params.setupId);
      //     address.set(req.body);
      //
      //
      //     return doc.save();
      //   })
      //   .then((doc) => {
      //     res.status(200).send({ doc });
      //   })

    } catch(err) {
      next(err )
    }
  },

//   db.collection.update(
//   {
//     "_id" : 1,
//     "medications.id" : 23,
//     "medications.prescriptions.id" : 77 },
//   {
//     $set : { "medications.prescriptions.$.quantity" : 30 }
//   },
//   false,
//   true
// )
  deleteMedicalSetup: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.params.doctorId)
      if(!doc.medical_setups.id(req.params.setupId)){
        return res.status(400).json({message:"already deleted"})
      }
      const removed = doc.medical_setups.pull(req.params.setupId)
      await doc.save()
      console.log(removed)
      res.status(200).json({success:true})
    } catch(err) {
      next(err )
    }
  },
}
