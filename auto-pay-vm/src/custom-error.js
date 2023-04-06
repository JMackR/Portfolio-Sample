'use strict';

const HttpStatus = require('http-status');

/**
 * Custom error class, which can be extended to throw a specific statusCode and create an instance of a particular custom error class.
 */
class CustomError extends Error {
  statusCode;

  constructor(message) {
    super(typeof message === 'string' ? message : JSON.stringify(message));
  }
}

class ExternalApiError extends CustomError {
  statusCode = HttpStatus.BAD_GATEWAY;
}

class BadRequestError extends CustomError {
  statusCode = HttpStatus.BAD_REQUEST;
}

class UnauthorizedError extends CustomError {
  statusCode = HttpStatus.UNAUTHORIZED;
}

class ForbiddenError extends CustomError {
  statusCode = HttpStatus.FORBIDDEN;
}

class NotFoundError extends CustomError {
  statusCode = HttpStatus.NOT_FOUND;
}

module.exports = {
  CustomError,
  ExternalApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
