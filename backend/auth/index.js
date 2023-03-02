import { Strategy, ExtractJwt } from "passport-jwt";
import * as dotenv from 'dotenv'

dotenv.config()

export default function jwtStrategy(passport) {
    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JSONKEY
        }, function (payload, done) {
            try {
                //payload holds request object? puts the stuff from object into the user object 
                return done(null, { username: payload.username, id: payload.id })
            } catch (e) {
                //first parameter is error callback, second is what returns in user object
                return done(e, null)
            }
        })
    )
}