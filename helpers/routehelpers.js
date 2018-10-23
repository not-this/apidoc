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
    // POST for creating new profile picture for doctor and patient
    newProfilePictureSchema:Joi.object().keys({}),  // Check for req.file instead req.params object (candidate for new validation)

    // Doctor POST
    newDoctorSchema:Joi.object().keys({}),
    newMedicalSetupSchema:Joi.object().keys({}),

    // Doctor PATCH
    updateDoctorProfileSchema:Joi.object().keys({}),
    updateMedicalSetupSchema:Joi.object().keys({}),

    // Doctor GET - use modified validateParam to validate schemas who require only params

    // getDoctorProfileSchema:Joi.object().keys({}),
    // getDoctorMedicalSetupsSchema:Joi.object().keys({}),
    // getDoctorMedicalSetupSchema:Joi.object().keys({}),
    // getDoctorAppointmentSchema:Joi.object().keys({}),
    // getDoctorAppointmentsSchema:Joi.object().keys({}),

    // Patient POST
    newPatientSchema:Joi.object().keys({}),
    newAppointmentSchema:Joi.object().keys({}),

    // Patient PATCH
    updatePatientProfileSchema:Joi.object().keys({}),

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
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
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
