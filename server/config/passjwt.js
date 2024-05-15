const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'PROJECTFORBOOKWEBANDTPC';
opts.passReqToCallback= true;

passport.use(new JwtStrategy(opts, function (req,jwt_payload, done) {
    if(jwt_payload.id == 'tpcadmin')
    {
        return done(null,'approved');
    }
    else
    {
        return done(err, false);
    }
}));