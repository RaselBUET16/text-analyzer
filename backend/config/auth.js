const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/User');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await UserModel.findById(payload.id);
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await UserModel.findOne({gId: profile.id});

        if (!user) {
            user = await UserModel.create({
                gId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName
            })
        }

        return done(null, user);
    } catch (error) {
        printError(error);
        return done(error);
    }
}));