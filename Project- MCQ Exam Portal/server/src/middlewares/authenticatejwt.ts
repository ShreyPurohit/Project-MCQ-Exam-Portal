import { Request, Response, NextFunction } from "express";
import passport from "passport";

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized', info });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export default authenticateJwt