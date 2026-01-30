import { NextFunction, Request, Response } from "express";
import APIError from "../utils/APIError";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    // mongo 3 types errors: validation error, duplicate key error, cast error
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message, status: "error" });
    }
    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id Format", status: "error" });
    }
    if (err.name === "MongoServerError" && (err as any)?.code === 11000) {
        const message = Object.entries((err as any).errorResponse.keyValue).map(([key, value]) => `${key} ${value} already exists`).join("");

        return res.status(400).json({ message: message, status: "error" });
    }

    if (err instanceof APIError) {
        return res.status(err.statusCode).json({ message: err.message, error: err.message });
    }


    res.status(500).json({ message: "Internal server error", error: err.message });
}