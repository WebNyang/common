import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { RequestValidationError } from '../errors';

/**
 * Receive validation result from express-validator.
 * if error exists, return RequestValidationError.
 *
 * @param req Request object from Express.
 * @param res Response object form Express.
 * @param next Next function from express.
 */
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
    }

    next();
};

export { validateRequest };
