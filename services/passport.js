const passport = require('passport');
const keys = require('../config/keys');
const googleStrategy = require('passport-google-oauth20').Strategy;
// const facebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose');
const User = mongoose.model('user');


passport.serializeUser((user, done) => {
  return done(null, user.id)
});
passport.deserializeUser((id, done) => {

  User.findById(id, (err, res) => {
    if (err) {
      return done(err);
    }
    return done(null, res);
  })
});
// google strategy 
passport.use(new googleStrategy({
  clientID: keys.googleAuth.CLIENT_ID,
  clientSecret: keys.googleAuth.CLIENT_SECRET,
  callbackURL: keys.googleAuth.CALL_BACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }
  const user = new User({
    name: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id,
    profileUrl: profile.photos[0].value
  });
  await user.save();
  console.log(user);
  return done(null, user);
}));

// facebook statregy

// passport.use(new facebookStrategy({
//   clientID: keys.facebookAuth.CLIENT_ID,
//   clientSecret: keys.facebookAuth.CLIENT_SECRET,
//   callbackURL: keys.facebookAuth.CALL_BACK_URL,
//   profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name','profileUrl']
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log(profile);
//   //console.log(profile._json.picture.data.url)
// }
// ));






