const Joi = require('joi')

module.exports = {
  validateParam: (schema,names)=>{
    return (req,res,next)=>{

      names.forEach((name)=>{
        const result = Joi.validate({param: req['params'][name]},schema )
        if(result.error){
          return res.status(400).json(result.error)
        } else {
          if(!req.value){
            req.value = {}
          }
          if(!req.value['params']){
            req.value['params'] = {}
          }
          req.value['params'][name] = result.value.param
        }
      })
      next()
    }
  },
  validateBody:(schema) => {
      return (req,res,next) =>{
        const result = Joi.validate(req.body, schema)
        if(result.error){
          return res.status(400).json(result.error)
        } else {
          if(!req.value)
            req.value = {}

          if(!req.value['body'])
            req.value['body'] = {}

          req.value['body'] = result.value
          next()
        }
      }
  },

  schemas: {
    // Common schema
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    // POST for creating new profile picture for doctor and patient
    // This validation is handled by multer - Check for file existince, fileType , TODO : Also check fileSize
    // newProfilePictureSchema:Joi.object().keys({}),

    // Doctor POST
    newDoctorSchema:Joi.object().keys({
      degrees:Joi.array().max(10).items(Joi.string().max(100)).required(),
      firstName:Joi.string().required(),
      lastName:Joi.string(),
      about:Joi.string(),
      treatments:Joi.array().max(500).items(Joi.string().max(100)),
      speciality:Joi.array().max(10).items(Joi.string().max(1000)),
      local_auth:Joi.object().keys({
        email:Joi.string().email(),
        password:Joi.string().required()
      })
    }),
    doctorSignUpSchema:Joi.object().keys({
      local_auth:Joi.object().keys({
        email:Joi.string().email(),
        password:Joi.string().required()
      })
    }),
    newMedicalSetupSchema:Joi.object().keys({
      name:Joi.string().required(),
      address_lines:Joi.array().max(10).items(Joi.string().max(50)).required(),
      contact_number:Joi.array().max(5).items(Joi.string().max(20)).required(),
      timings:Joi.array().max(5).items(Joi.string().max(20)).required(),
      slots:Joi.array().max(10).items(Joi.string().max(50)),
      days:Joi.array().max(7).items(Joi.string().max(10)).required()
    }),

    // Doctor PATCH
    updateDoctorProfileSchema:Joi.object().keys({
      degrees:Joi.array().max(10).items(Joi.string().max(100)),
      firstName:Joi.string(),
      lastName:Joi.string(),
      about:Joi.string(),
      treatmeants:Joi.array().max(500).items(Joi.string().max(1000)),
      speciality:Joi.array().max(10).items(Joi.string().max(1000))
    }),
    updateMedicalSetupSchema:Joi.object().keys({
      name:Joi.string(),
      address_lines:Joi.array().max(10).items(Joi.string().max(50)),
      contact_number:Joi.array().max(5).items(Joi.string().max(20)),
      timings:Joi.array().max(5).items(Joi.string().max(20)),
      slots:Joi.array().max(10).items(Joi.string().max(50)),
      days:Joi.array().max(7).items(Joi.string().max(10))
    }),

    // Doctor GET - use modified validateParam to validate schemas who require only params

    // getDoctorProfileSchema:Joi.object().keys({}),
    // getDoctorMedicalSetupsSchema:Joi.object().keys({}),
    // getDoctorMedicalSetupSchema:Joi.object().keys({}),
    // getDoctorAppointmentSchema:Joi.object().keys({}),
    // getDoctorAppointmentsSchema:Joi.object().keys({}),

    // Patient POST
    newPatientSchema:Joi.object().keys({
      firstName:Joi.string().required(),
      lastName:Joi.string(),
      age:Joi.number(),
      local_auth:Joi.object().keys({
        email:Joi.string().email(),
        password:Joi.string().required()
      })
    }),
    newAppointmentSchema:Joi.object().keys({
      date:Joi.string().required(),
      slot:Joi.number().required(),
      place:Joi.string().required(),
      description:Joi.string().required(),
      // TODO - When creating an appointment add Doctor.medical_setups{name,address_lines,location,contact}
      //        to Bookings.place {name,address_lines,location,contact}
    }),

    // Patient PATCH
    updatePatientProfileSchema:Joi.object().keys({
      firstName:Joi.string(),
      lastName:Joi.string(),
      age:Joi.number(),
    }),

    // Patient GET - use modified validateParam to validate schemas who require only params

    // getPatientProfileSchema:
    // getDoctorsListSchema:
    // getDoctorDetailsSchema:
    // getPatientAppointmentSchema:
    // getPatientAppointmentSchema:

    userSchema:Joi.object().keys({
      firstName:Joi.string().required(),
      lastName:Joi.string().required(),
      email:Joi.string().email().required()
    }),
    userSchemaOptional:Joi.object().keys({
      firstName:Joi.string(),
      lastName:Joi.string(),
      email:Joi.string().email()
    }),
    carSchema:Joi.object().keys({
      make:Joi.string().required(),
      model:Joi.string().required(),
      year:Joi.string().required()
    }),

    newCarSchema:Joi.object().keys({
      seller:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      make:Joi.string().required(),
      model:Joi.string().required(),
      year:Joi.string().required()
    }),
    putCarSchema:Joi.object().keys({
      make:Joi.string().required(),
      model:Joi.string().required(),
      year:Joi.string().required()
    }),
    patchCarSchema:Joi.object().keys({
      make:Joi.string(),
      model:Joi.string(),
      year:Joi.string()
    })
  }
}
