import authService from '@services/auth-service';
import {ParamMissingError, SomethingWentWrongError} from '@shared/errors';
import {Request, Response, Router} from 'express';
import StatusCodes from 'http-status-codes';
import AuthValidator from "@routes/validators/auth-validator";


// Constants
const router = Router();
const {OK} = StatusCodes;

// Paths
export const p = {
    login: '/login',
    logout: '/logout',
    register: '/register'
} as const;

// Cookie Properties
export const cookieProps = Object.freeze({
    key: 'accessToken',
    secret: process.env.COOKIE_SECRET,
    options: {
        httpOnly: true,
        signed: true,
        path: (process.env.COOKIE_PATH),
        maxAge: Number(process.env.COOKIE_EXP),
        domain: (process.env.COOKIE_DOMAIN),
        secure: (process.env.SECURE_COOKIE === 'true'),
    },
});


/**
 * Login a user.
 */
router.post(p.login, async (req: Request, res: Response) => {
    try {
        await AuthValidator.validate(req.body);
        // Check email and password present
        const {email, password} = req.body;
        if (!(email && password)) {
            throw new ParamMissingError();
        }
        // Get jwt
        const jwt = await authService.login(email, password);
        // Add jwt to cookie
        const {key, options} = cookieProps;
        res.cookie(key, jwt, options);

        return res.status(OK).end();
    } catch (e) {
        throw new SomethingWentWrongError(e.message);
    }
});


/**
 * Logout the user.
 */
router.get(p.logout, (_: Request, res: Response) => {
    try {
        const {key, options} = cookieProps;
        res.clearCookie(key, options);
        return res.status(OK).end();
    } catch (e) {
        throw new SomethingWentWrongError(e.message);
    }

});

/**
 * Register new user.
 */
router.post(p.register, async (req: Request, res: Response) => {
    try {
        await AuthValidator.validate(req.body);
        const {email, password} = req.body;
        await authService.register(email, password);
        return res.status(OK).end();
    } catch (e) {
        throw new SomethingWentWrongError(e.message);
    }

})

// Export router
export default router;
