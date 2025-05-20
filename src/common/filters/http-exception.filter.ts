import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const request = context.getRequest<Request>();
      const status = exception.getStatus();
  
      const errorResponse = exception.getResponse();
      const message = typeof errorResponse === 'string' ? errorResponse : errorResponse['message'];
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message || 'Internal Server Error',
      });
    }
  }
  