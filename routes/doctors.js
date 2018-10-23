const express = require('express')
const multer = require('multer')
const router = express.Router()
const doctorsController = require('../controllers/doctors')
const {validateParam,validateBody,schemas} = require('../helpers/routehelpers')

// const multerConfig = {

//   //specify diskStorage (another option is memory)
//   storage: multer.diskStorage({
//
//     //specify destination
//     destination: function(req, file, next){
//       next(null, './public/photo-storage');
//     },
//
//     //specify the filename to be unique
//     filename: function(req, file, next){
//       console.log(file);
//       //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
//       const ext = file.mimetype.split('/')[1];
//       //set the file fieldname to a unique name containing the original name, current datetime and the extension.
//       next(null, file.fieldname + '-' + Date.now() + '.'+ext);
//     }
//   }),
//
//   // filter out and prevent non-image files.
//   fileFilter: function(req, file, next){
//         if(!file){
//           next();
//         }
//
//       // only permit image mimetypes
//       const image = file.mimetype.startsWith('image/');
//       if(image){
//         console.log('photo uploaded');
//         next(null, true);
//       }else{
//         console.log("file not supported")
//         //TODO:  A better message response to user on failure.
//         return next();
//       }
//   }
// };


const multerConfig = {
  storage : multer.diskStorage({
    destination: (req,file,next)=>{
      next(null,'./public/photo-storage')
    },

    filename: (req,file,next)=>{
      console.log(file)
      const ext = file.mimetype.split('/')[1]
      next(null, file.fieldname + '-' + Date.now() + '.'+ext)
    },

    fileFilter: (req,file,next)=>{
      if(!file){
        next()
      }
      const image = file.minetype.startwith('image/')
      if(image){
        console.log('photo uploaded')
        next()
      } else {
        console.log('file not supported')
        next()
      }
    }
  })
}

router.route('/')
  .post(doctorsController.newDoctor)

router.route('/:doctorId')
  .get(doctorsController.getDoctorProfile)
  .patch(doctorsController.updateDoctorProfile)

router.route('/:doctorId/profile-pictures')
  .post(multer(multerConfig).single('photo'), doctorsController.uploadProfilePicture)
//   .get()
//   .patch()

router.route('/:doctorId/medical-setups')
  .post(doctorsController.createMedicalSetup)
  .get(doctorsController.listMedicalSetups)

router.route('/:doctorId/medical-setups/:setupId')
  .get(doctorsController.getMedicalSetup)
  .patch(doctorsController.updateMedicalSetup)
  .delete(doctorsController.deleteMedicalSetup)

router.route('/:doctorId/appointments/:appointmentId')
  .get(doctorsController.getAppointment)
// .patch(doctorsController.updateAppointment)
  .delete(doctorsController.cancelAppointment)

router.route('/:doctorId/appointments')
  .get(doctorsController.appointments)





module.exports = router
