import { Request, Response, NextFunction } from 'express';
import { logger } from '@sangwoo/logger';

import { CustomError } from '../errors';

/**
 * Error handler middleware.
 *
 * @param err Error object.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @param next Next function from express.
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error.
    logger.error(err.message);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(500).send({ message: err.message });
}

export { errorHandler };
