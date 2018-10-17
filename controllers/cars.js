const Joi = require('joi')

const User = require('../models/user')
const Car = require('../models/car')



module.exports = {
  index: async (req,res,next) => {
    try {
      const cars = await Car.find({})
      res.status(200).json(cars)
    } catch(err){
      next(err)
    }
  },
  newCar: async (req,res,next) => {
    try{
      const seller = findById(req.value.body)
      const newCar = req.value.body
      delete newCar.seller
      const car = new Car(newCar)
      await car.save()
      seller.cars.push(car)
      await seller.save()
      res.status(200).json(car)
    } catch(err){
      next(err)
    }
  },
  getCar: async (req,res,next) => {
    try {
      const {carId} = req.value.params
      const car = Car.findById(userId)
      res.status(200).json(car)
    } catch(err) {
      next(err)
    }
  },
  replaceCar: async (req,res,next) =>{
    try {
      const {carId} = req.value.params
      const newCar = req.value.body
      const result = await Car.findByIdAndUpdate(carId, newCar)
      res.status(200).json({success:true})
    } catch(err){
      next(err)
    }
  },
  updateCar: async (req,res,next) => {
    try {
      const {carId} = req.value.params
      const newCar = req.value.body
      const result = await Car.findByIdAndUpdate(carId, newCar)
      res.status(200).json({success:true})
    } catch(err){
      next(err)
    }
  },
  deleteCar: async (req,res,next) =>{
    try {
      const {carId} = req.value.params
      // Get the car
      // Get the seller (user)
      // remove the car with (userId param)
      // pop the car form seller.cars[]
      const car = Car.findById(carId)
      const sellerId = car.seller // because of seller: {Type:schema.ObjectId}
      const seller = User.findById(sellerId)
      await car.remove()
      seller.cars.pull(car)
      await seller.save()
      res.status(200).json({success:true})
    } catch(err){
      next(err)
    }
  }
}
