const express = require('express')
const router = express.Router()
const doctorsController = require('../controllers/doctors')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

// -->  hostname/doctors/
router.route('/new')
  .post(doctorsController.newDoctor)

  // .post(validateBody(schemas.userSchema),usersController.newUser)
 router.route('/:doctorId')
 .get(doctorsController.getDoctorProfile)


//
// router.route('/:userId')
//   .get(
//     validateParam(schemas.idSchema,'userId'),
//     usersController.getUser
//   )
//   .put(
//     [
//       validateParam(schemas.idSchema,'userId'),
//       validateBody(schemas.userSchema)
//     ],usersController.replaceUser
//   )
//   .patch(
//     [
//       validateParam(schemas.idSchema,'userId'),
//       validateBody(schemas.userSchemaOptional)
//     ],
//     usersController.updateUser
//   )
//   .delete()
//
// router.route('/:userId/cars')
//   .get(validateParam(schemas.idSchema,'userId'),usersController.getUserCars)
//   .post(
//     [
//       validateParam(schemas.idSchema,'userId'),
//       validateBody(schemas.carSchema)
//     ],
//     usersController.newUserCars
//   )

module.exports = router
