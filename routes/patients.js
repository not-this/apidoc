const express = require('express')
const router = express.Router()
const patientsController = require('../controllers/patients')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

router.route('/')
  .post(patientsController.newPatient)

router.route('/:patientId')
   .get(patientsController.getPatientProfile)
   .patch(patientsController.updatePatientProfile)

router.route('/:patientId/profile-pictures')
  .post(patientsController.uploadProfilePicture)
  // .get()
  // .patch()

router.route('/doctors')
  .get(patientsController.doctorsList)

router.route('/doctors/:doctorId')
  .get(patientsController.doctorDetails)

router.route('/:patientId/appointments')
  .get(patientsController.appointments)

router.route('/:patientId/appointments/doctors/:doctorsId/:appointmentId')
  .get(patientsController.appointmemnt)
  // .patch(patientController.updateAppointment)

router.route('/:patientId/appointments/:appointmentId')
  .delete(patientsController.cancelAppointment)

router.route('/:patientId/appointments/doctors/:doctorId')
  .post(patientsController.createAppointment)



module.exports = router
