// passport-config.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../model/User');
const crypto=require('crypto');
const {sanitizeUser,cookieExtractor}=require('../middleware/auth');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET_KEY = 'SECRET_KY';
// JWT options
const opts = {};
//opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;


passport.use(
  'local',
  new LocalStrategy(
    {usernameField:'email'},
    async function (email, password, done) {
    // by default passport uses username
    try {  
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: 'invalid credentials' }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: 'invalid credentials' });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, {id:user.id,role:user.role,token:token}); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

  passport.use(
    'jwt',
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log({ jwt_payload });
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          console.log("jwt  ",user);
          return done(null, sanitizeUser(user)); // this calls serializer
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

  passport.serializeUser(function(user, cb) {
    console.log("serialize---",user);
    process.nextTick(function() {
      return cb(null, {id:user.id,role:user.role});
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function () {
        return cb(null, user);
      });
  });

module.exports = passport;
