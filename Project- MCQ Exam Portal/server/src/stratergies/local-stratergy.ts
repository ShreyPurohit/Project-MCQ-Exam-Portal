import passport, { DoneCallback } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from 'config'
import bcrypt from 'bcryptjs'

import UserModel from '../models/userModel';
const JWT_SECRET = config.get("token_config.secret_key");

// Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (username: string, password: string, done: any) => {
    try {
        const user: any = await UserModel.findOne({ email: username }).select("+password");
        if (!user) {
            return done(null, false, { message: 'User Not Found' });
        }
        if (!bcrypt.compareSync(password, String(user.password))) {
            return done(null, false, { message: 'Incorrect Credentials.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// JWT Strategy
const opts: any = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload: any, done: DoneCallback) => {
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