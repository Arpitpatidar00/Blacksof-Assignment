import { Response } from "express";
import { ApiResponse } from "@blacksof/types";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export abstract class BaseController {
  protected sendSuccess<T>(
    res: Response,
    data: T,
    message = "Operation successful",
    statusCode: HttpStatus = HttpStatus.OK
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  protected sendError(
    res: Response,
    message = "Internal Server Error",
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    errors?: string[]
  ) {
    const response: ApiResponse<null> = {
      success: false,
      message,
      errors,
    };
    return res.status(statusCode).json(response);
  }
}
