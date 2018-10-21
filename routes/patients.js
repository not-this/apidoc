const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

// -->  hostname/patient/
router.route('/')
  .post(patientsController.newPatient)

router.route('/:patientId')
   // .get(patientsController.getPatientProfile)
//    .patch(patientsController.updatePatientProfile)
//
router.route('/doctors')
  .get(patientsController.doctorsList)
//
router.route('/doctors/:doctorId')
  .get(patientsController.doctorDetails)
//
router.route('/:patientId/appointments')
  .get(patientsController.appointments)
//
  router.route('/:patientId/appointments/doctors/:doctorsId/:appointmentId')
  .get(patientsController.appointmemnt)
  // .patch(patientController.updateAppointment)
  // .delete(patientController.cancelAppointment)
//
router.route('/:patientId/appointments/doctors/:doctorId')
  .post(patientsController.createAppointment)



module.exports = router
