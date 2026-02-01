import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { env } from '../config/env';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(`Error: ${err.message}`, err.stack);

	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
			...(env.NODE_ENV === 'development' && { stack: err.stack }),
		});
	}

	if (err.name === 'CastError') {
		return res.status(400).json({
			success: false,
			message: 'Invalid ID format',
		});
	}

	if ((err as any).code === 11000) {
		const field = Object.keys((err as any).keyValue)[0];
		return res.status(409).json({
			success: false,
			message: `${field} already exists`,
		});
	}

	if (err.name === 'ValidationError') {
		const errors = Object.values((err as any).errors).map(
			(e: any) => e.message,
		);
		return res.status(400).json({
			success: false,
			message: 'Validation error',
			errors,
		});
	}

	return res.status(500).json({
		success: false,
		message: 'Internal server error',
		...(env.NODE_ENV === 'development' && { stack: err.stack }),
	});
};

export const notFoundHandler = (req: Request, res: Response) => {
	res.status(404).json({
		success: false,
		message: `Route ${req.originalUrl} not found`,
	});
};
