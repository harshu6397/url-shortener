import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import * as errorMessages from '../../constants/responseMessages/errorMessages.json';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const logger = new LoggerService();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const details =
      exception instanceof HttpException
        ? exception.getResponse()
        : errorMessages.INTERNAL_SERVER_ERROR;

    logger.error('exception', exception);
    response.status(status).json({
      success: false,
      details: details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
