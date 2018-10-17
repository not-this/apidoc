const express = require('express')
const router = express.Router()
const carsController = require('../controllers/cars')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

router.route('/')
  .get(carsController.index)
  .post(validateBody(schemas.newCarSchema),carsController.newCar)

router.route('/:carId')
  .get(validateParam(schemas.IdSchema,'carId'),carsController.getCar)
  .put([validateParam(schemas.IdSchema,'carId'),validateBody(schemas.putCarSchema)],carsController.replaceCar)
  .patch([validateParam(schemas.IdSchema,'carId'),validateBody(schemas.patchCarSchema)],carsController.updateCar)
  .delete(validateParam(schemas.IdSchema,'carId'),carsController.deleteCar)

module.exports = router
