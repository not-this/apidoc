const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

// -->  hostname/patient/
router.route('/')
  .post(patientsController.newPatient)

router.route('/:patientId')
   .get(patientsController.getPatientProfile)
//    .patch(patientsController.updatePatientProfile)
//
// router.route('/doctors')
//   .get(patientsController.doctorsList)
//
// router.route('/doctors/:doctorId')
//   .get(patientsController.doctorDetails)
//
// router.route('/:patiendId/appointmemnts')
//   .get(patientsController.appointments)
//
//   router.route('/:patiendId/appointmemnts/docotrs/:doctorsId/:appointmetId')
//   .get(patientsController.appointmemnt)
//   .patch(patientController.updateAppointment)
//   .delete(patientController.cancelAppointment)
//
// router.route('/:patiendId/appointmemnts/doctors/:doctorId')
//   .post(patientsController.createAppointment)



module.exports = router
