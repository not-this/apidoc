const express = require('express')
const multer = require('multer')
const router = express.Router()
const patientsController = require('../controllers/patients')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

const multerConfig = {
  storage : multer.diskStorage({
    destination: (req,file,next)=>{
      next(null,'./public/photo-storage')
    },

    filename: (req,file,next)=>{
      const ext = file.mimetype.split('/')[1]
      next(null, file.fieldname + '-' + Date.now() + '.'+ext)
    }
  }),
  fileFilter: (req,file,next)=>{
    console.log(file)
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(file.mimetype.split('/')[1].toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    console.log('here')
    if(!file){
      next("Please upload a file")
    }
    let image = false
    if(file.mimetype.split('/')[0].toLowerCase() === 'image'){
      image = true
    }

    if(image){
      if(mimetype && extname){
      console.log('photo uploaded')
        next(null, true)
      } else {
      console.log('file not supported')
        console.log("file not supported")
        next("File not supported")
      }
    } else {
      console.log("File not supported")
      next("File not supported")
    }
  }
}


router.route('/')
  .post(patientsController.newPatient)

router.route('/:patientId')
   .get(patientsController.getPatientProfile)
   .patch(patientsController.updatePatientProfile)

router.route('/:patientId/profile-pictures')
  .post(multer(multerConfig).single('photo'), patientsController.uploadProfilePicture)
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
