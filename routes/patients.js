const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

// -->  hostname/patient/
router.route('/')
  .post(patientsController.newPatient)

  // .post(validateBody(schemas.userSchema),usersController.newUser)
 router.route('/:patientId')
 .get(patientsController.getPatientProfile)
// .patch(userController.updatePatientProfile)

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
