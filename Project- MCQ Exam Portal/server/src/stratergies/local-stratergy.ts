import passport, { DoneCallback } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from 'config'
import bcrypt from 'bcryptjs'

import UserModel from '../models/userModel';
const JWT_SECRET = config.get("token_config.secret_key");

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ email: username }).select('+password');
        if (!user) {
            return done(null, false, { message: 'User Not Found' });
        }
        const isMatch = bcrypt.compareSync(password, String(user.password));
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect Credentials.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

// JWT Strategy
const opts: any = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await UserModel.findById(jwt_payload.user.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

export default passport