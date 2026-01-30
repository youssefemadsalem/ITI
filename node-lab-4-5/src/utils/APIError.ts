class APIError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // by default, the stack trace is not captured for custom errors
        Error.captureStackTrace(this, this.constructor);
    }
}

export default APIError;