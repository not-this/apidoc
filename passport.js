const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
// const { JWT_SECRET } = require('./configuration');
const Doctor = require('./models/doctor');


passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'secretcode'
}, async (payload, done) => {
  try {
    // console.log('inside passport js')
    // Find the user specified in token
    const user = await Doctor.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}))

passport.use(new LocalStrategy({
  usernameField:'email'
}, async(email,passowrd,done)=>{
  try {
    // find the user given the Email
    const user = await Doctor.findOne({'local_auth.email': email})

    // if not handle it
    if(!user){
      return done(null,false)
    }

    // Check if passord is correct
    const isMatch = await user.isValidPassword(password)
    if(!isMatch){
      return done(null,false)
    }

    done(null,user)
  } catch(err){
    done(error,false)
  }
}))
