const express = require('express')
const multer = require('multer')
const router = express.Router()
const doctorsController = require('../controllers/doctors')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

const passport = require('passport');
const passportConf = require('../passport');

const passportJWT = passport.authenticate('jwt', { session: false })
const passportSignIn = passport.authenticate('local', { session: false })

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
  .post(validateBody(schemas.newDoctorSchema),doctorsController.newDoctor)

router.route('/signin')
  .post(passportSignIn,validateBody(schemas.newDoctorSchema),doctorsController.doctorSignIn)

router.route('/:doctorId')
  .get(passportJWT,validateParam(schemas.idSchema,['doctorId']), doctorsController.getDoctorProfile)
  .patch(validateParam(schemas.idSchema,['doctorId']),validateBody(schemas.updateDoctorProfileSchema),
    doctorsController.updateDoctorProfile)

router.route('/:doctorId/profile-pictures')
  .post(multer(multerConfig).single('photo'), doctorsController.uploadProfilePicture)
//   .get()
//   .patch()

router.route('/:doctorId/medical-setups')
  .post(validateParam(schemas.idSchema,['doctorId']),validateBody(schemas.newMedicalSetupSchema),
    doctorsController.createMedicalSetup)
  .get(validateParam(schemas.idSchema,['doctorId']), doctorsController.listMedicalSetups)

router.route('/:doctorId/medical-setups/:setupId')
  .get(validateParam(schemas.idSchema,['doctorId','setupId']),doctorsController.getMedicalSetup)
  .patch(validateParam(schemas.idSchema,['doctorId','setupId']),validateBody(schemas.updateMedicalSetupSchema),
    doctorsController.updateMedicalSetup)
  .delete(doctorsController.deleteMedicalSetup)

router.route('/:doctorId/appointments/:appointmentId')
  .get(validateParam(schemas.idSchema,['doctorId','appointmentId']),doctorsController.getAppointment)
// .patch(doctorsController.updateAppointment)
  .delete(validateParam(schemas.idSchema,['doctorId','appointmentId']),doctorsController.cancelAppointment)

router.route('/:doctorId/appointments')
  .get(validateParam(schemas.idSchema,['doctorId']), doctorsController.appointments)





module.exports = router
