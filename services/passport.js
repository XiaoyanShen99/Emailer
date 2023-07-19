const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const { default: mongoose } = require('mongoose');

const User = mongoose.model('users'); // poll model user from mongoose

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        },
    (accessToken, refreshToken, profile, done) => {
        // console.log('access token', accessToken);
        // console.log('refresh token', refreshToken);
        // console.log('profile:', profile);
        User.findOne({googleId : profile.id}) // check whether we have this user
            .then((existingUser) => {
                if (existingUser) {
                    // do nothing
                    done(null, existingUser);
                } else {
                    new User({googleId: profile.id}).save()
                      .then(user => done(null, user));
                }
        });   
    }
  )
); 