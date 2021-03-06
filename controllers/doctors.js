const Joi = require('joi')
const fs = require('fs')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')
const Booking = require('../models/booking')
const JWT = require('jsonwebtoken');
// const User = require('../models/user');
// const { JWT_SECRET } = require('../configuration');

signToken = user => {
  return JWT.sign({
    iss: 'apidoc',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, 'secretcode');
}

module.exports = {



  doctorSignUp: async (req, res, next) => {
    try {
      const { email, password } = req.value.body.local_auth;

      // Check if there is a user with the same email
      const foundDoctor = await Doctor.findOne({ email });
      if (foundDoctor) {
        return res.status(403).json({ error: 'Email is already in use'});
      }

      // Create a new doctor
      const newDoc = new Doctor(req.value.body)
      await newDoc.save()

      // Generate the token
      const token = signToken(newDoc);

      // Respond with token
      res.status(200).json({ token });
    } catch(err) {
        next(err)
    }
  },
  //
  // },
  // INSTEAD of this use patch request to update basic profile - updateDoctorProfile & send docId if possible
  // newDoctorOne: async (req, res, next) => {
  //   try {
  //     // Doctor will sign up (ubove route)
  //     // it will create the doctor
  //     const doctorId = req.value.body.id;
  //     // if (!foundDoctor) {
  //     //   return res.status(403).json({ error: 'Please sign up'});
  //     // }
  //     const docObj = JSON.parse(JSON.stringify(req.value.body))
  //     // strip id fielf from the new object
  //     delete docObj._id
  //     // update the doctor
  //     await Doctor.findByIdAndUpdate(id, docObj)
  //     res.status(200).json({ success:true });
  //   } catch(err) {
  //       next(err)
  //   }
  //
  // },

  newDoctor: async (req, res, next) => {
    try {
      const { email, password } = req.value.body.local_auth;

      // Check if there is a user with the same email
      const foundDoctor = await Doctor.findOne({ email });
      if (foundDoctor) {
        return res.status(403).json({ error: 'Email is already in use'});
      }

      // Create a new doctor
      const newDoc = new Doctor(req.value.body)
      await newDoc.save()

      // Generate the token
      const token = signToken(newDoc);

      // Respond with token
      res.status(200).json({ token });
    } catch(err) {
        next(err)
    }

  },
  doctorSignIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.value.user);
    res.status(200).json({ token });
  },

  // newDoctor: async (req,res,next)=>{
  //   try {
  //     console.log(req.value.body)
  //     const newDoc = new Doctor(req.value.body)
  //     const doctor = await newDoc.save()
  //     res.status(201).json(doctor)
  //   } catch(err){
  //     next(err)
  //   }
  // },

  getDoctorProfile: async(req,res,next)=>{
    try {
      const doctor = await Doctor.findById(req.value.params.doctorId)
      res.status(200).json(doctor)
    } catch(err) {
      next(err )
    }
  },

  updateDoctorProfile: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.value.params.doctorId)
      // const address = doc.medical_setups.id(req.value.params.setupId)
      doc.set(req.value.body)
      await doc.save()
      res.status(200).json(doc)
    } catch(err) {
      next(err )
    }
  },

  getAppointment: async(req,res,next)=>{
    try {
      const doctor = await Doctor.findById(req.value.params.doctorId)
      res.status(200).json(doctor.active_bookings.id(req.value.params.appointmentId))
    } catch(err) {
      next(err )
    }
  },

  // updateAppointment: async(req,res,next)=>{
  //   try {
  //
  //   } catch(err) {
  //     next(err )
  //   }
  // },
  uploadProfilePicture: async(req,res,next)=>{
    try {

      // const upload = multer({
      //   storage: storage,
      //   limits:{fileSize: 1000000},
      //   fileFilter: function(req, file, cb){
      //     checkFileType(file, cb);
      //   }
      // }).single('myImage');
      //
      // // Check File Type
      // function checkFileType(file, cb){
      //   // Allowed ext
      //   const filetypes = /jpeg|jpg|png|gif/;
      //   // Check ext
      //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      //   // Check mime
      //   const mimetype = filetypes.test(file.mimetype);
      //
      //   if(mimetype && extname){
      //     return cb(null,true);
      //   } else {
      //     cb('Error: Images Only!');
      //   }
      // }
      // multer(multerConfig).single('photo')
      console.log(req.file)
      const doctor = await Doctor.findById(req.value.params.doctorId)
      // doctor.profile_img.data = Buffer(fs.readFileSync(req.file.path), 'base64')
      // doctor.profile_img.contentType = 'image/png'
      // req.value.body.photo = req.file.filename
      doctor.photo = req.file.filename
      await doctor.save()
      res.status(201).send({success:true})
    } catch(err) {
      next(err)
    }
  },
  cancelAppointment: async(req,res,next)=>{
    try {
      const {appointmentId,doctorId} = req.value.params
      const doctor = await Doctor.findById(doctorId)
      const booking = doctor.active_bookings.id(appointmentId)
      const patientId = booking.patientId
      Patient.findOneAndUpdate({ _id : patientId },  { $pull: { active_bookings: { bookingId: booking.bookingId }}} )
      doctor.active_bookings.pull(booking)
      await doctor.save()
      await Booking.findOneAndUpdate({_id:booking.bookingId}, { $set: { completed: true }})
      res.status(200).send({success:true})
    } catch(err) {
      next(err )
    }
  },
  appointments: async(req,res,next)=>{
    try {
      const doctor = await Doctor.findById(req.value.params.doctorId)
      console.log(doctor.active_bookings)
      res.status(200).json(doctor.active_bookings)
    } catch(err) {
      next(err )
    }
  },
  createMedicalSetup: async(req,res,next)=>{
    try {
      const doctorId = req.value.params.doctorId
      const newSetup = req.value.body
      console.log(newSetup)
      const doctor = await Doctor.findById(doctorId)
      doctor.medical_setups.push(newSetup)
      await doctor.save()
      res.status(200).json({success:true})
    } catch(err) {
      next(err )
    }
  },
  listMedicalSetups: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.value.params.doctorId)
      res.status(200).json(doc.medical_setups)
    } catch(err) {
      next(err )
    }
  },
  getMedicalSetup: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.value.params.doctorId)
      const medical_setup = doc.medical_setups.id(req.value.params.setupId)
      res.status(200).json(medical_setup)
    } catch(err) {
      next(err )
    }
  },
  updateMedicalSetup: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.value.params.doctorId)
      const address = doc.medical_setups.id(req.value.params.setupId)
      address.set(req.value.body)
      await doc.save()
      res.status(200).send({ doc })
      // Promise version -

      // Doctor.findById(req.value.params.doctorId)
      //   .then((doc) => {
      //     const address = doc.medical_setups.id(req.value.params.setupId);
      //     address.set(req.value.body);
      //
      //
      //     return doc.save();
      //   })
      //   .then((doc) => {
      //     res.status(200).send({ doc });
      //   })

    } catch(err) {
      next(err )
    }
  },

  deleteMedicalSetup: async(req,res,next)=>{
    try {
      const doc = await Doctor.findById(req.value.params.doctorId)
      if(!doc.medical_setups.id(req.value.params.setupId)){
        return res.status(400).json({message:"already deleted"})
      }
      const removed = doc.medical_setups.pull(req.value.params.setupId)
      await doc.save()
      console.log(removed)
      res.status(200).json({success:true})
    } catch(err) {
      next(err )
    }
  },
}
