import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor() {
        super('Can not connect to database.');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Can not connect to database.' }];
    };
}
