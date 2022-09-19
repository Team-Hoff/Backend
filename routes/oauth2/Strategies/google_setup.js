
const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./keys');
const db = require('../model/database')



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((req, user, done) => {

  db.query("SELECT * FROM user WHERE  googleId=?",
   [ 
     user.googleId], (err, rows) => {
      if (err) {
          console.log(err);
          return done(null, err);
      }
          done(null, user);
  });
});



passport.use(
  new GoogleStrategy({
    callbackURL:'http://localhost:3500/api/auth/google/callback',
    clientID:  keys.google.clientID , 
    clientSecret: keys.google.clientSecret 
     },async(accessToken,refreshToken,profile,done)=>{
      process.nextTick(function () {
  db.query("SELECT * FROM user WHERE googleId = ?",
   [profile.id], (err, user) => {
      if (err) {
    return done(err);
    } else if (user) {
    return done(null, user);
    } else {
  let newUser = {
    googleId: profile.id,
    username: profile.displayName
                };
 db.query("INSERT INTO user (googleId,  username) VALUES (?, ?)",
   [newUser.googleId, newUser.username], (err, rows) => {
     if (err) {
    console.log(err);
      }
  return done(null, newUser);
  })
  }
    });
    });
  
    console.log( profile.id )
  }
));
  


