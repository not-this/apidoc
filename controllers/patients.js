const Joi = require('joi')

const User = require('../models/user')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')

module.exports = {
  // index: async (req,res,next)=>{
    // try {
    //   const users = await User.find({})
    //   res.status(200).json(users)
    // } catch(err) {
    //   next(err )
    // }
  // },

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
  }
  //
  // getUser: async (req,res,next)=>{
  //   try {
  //     const {userId} = req.value.params
  //     const user = await User.findById(userId)
  //     res.status(200).json(user)
  //   } catch(err){
  //     next(err)
  //   }
  // },
  //
  // replaceUser: async (req,res,next)=>{
  //   try {
  //     // enforce the req.body must contain all the fields
  //     const {userId} = req.value.params
  //     const newUser = req.value.body
  //     const result = await User.findByIdAndUpdate(userId, newUser)
  //     console.log(result)
  //     res.status(200).json({success:true})
  //   } catch(err){
  //     next(err)
  //   }
  // },
  //
  // updateUser: async (req,res,next)=>{
  //   try {
  //     // req.body may contain any number of fields
  //     const {userId} = req.value.params
  //     const newUser = req.value.body
  //     const result = await User.findByIdAndUpdate(userId, newUser)
  //     console.log(result)
  //     res.status(200).json({success:true})
  //   } catch(err){
  //     next(err)
  //   }
  // },
  //
  // getUserCars:async (req,res,next) => {
  //   try {
  //     const {userId} = req.value.params
  //     const user = await User.findById(userId).populate('cars')
  //     console.log('user\'s car ',user )
  //     res.status(200).json(user.cars)
  //   } catch(err){
  //     next(err)
  //   }
  // },
  //
  // newUserCars: async (req,res,next) => {
  //   try {
  //     const {userId} = req.value.params
  //     const newCar = new Car(req.value.body)
  //     const user = await User.findById(userId)
  //     newCar.seller = user
  //     await newCar.save()
  //     user.cars.push(newCar._id)
  //     await user.save()
  //     res.status(200).json(newCar)
  //   } catch(err){
  //     next(err)
  //   }
  // }
  //
  //
  //
  //

}
