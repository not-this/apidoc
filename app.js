const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/apiporject')
// Routes resources
const users = require('./routes/users')
const cars = require('./routes/cars')
const doctors = require('./routes/doctors')
const patients = require('./routes/patients')


// Middlewares
app.use(bodyParser.json());
app.use(logger('dev'))

// Routes
app.use('/users',users)
app.use('/cars',cars)
app.use('/doctors',doctors)
app.use('/patients',patients)

// Catch 404 errors and forward them to error handler
app.use((req,res,next)=>{
  const err = new Error('not found')
  err.status = 404
  next(err)
})

// Error handler function
app.use((err,req,res,next)=>{
  const error = app.get('env') === 'development' ? err : {}
  const status = error.status || 500
  // respond to client
  res.status(status).json({
    error:{
      message:error.message
    }
  })
  // respond to terminal
  console.error(err)
})
// Start the server

const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`server listining on port ${port}`))
