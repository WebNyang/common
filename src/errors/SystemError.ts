import { CustomError } from './CustomError';

export class SystemError extends CustomError {
    statusCode = 500;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, SystemError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    };
}
