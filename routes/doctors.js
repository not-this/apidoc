const express = require('express')
const router = express.Router()
const doctorsController = require('../controllers/doctors')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

router.route('/')
  .post(doctorsController.newDoctor)

router.route('/:doctorId')
  .get(doctorsController.getDoctorProfile)
  .patch(doctorsController.updateDoctorProfile)

router.route('/:doctorId/medical-setups')
  .post(doctorsController.createMedicalSetup)
  .get(doctorsController.listMedicalSetups)

router.route('/:doctorId/medical-setups/:setupId')
  .get(doctorsController.getMedicalSetup)
  .patch(doctorsController.updateMedicalSetup)
  .delete(doctorsController.deleteMedicalSetup)

router.route('/:doctorId/appointments/:appointmentId')
  .get(doctorsController.getAppointment)
//   .patch(doctorsController.updateAppointment)
  .delete(doctorsController.cancelAppointment)

router.route('/:doctorId/appointments')
  .get(doctorsController.appointments)





module.exports = router
