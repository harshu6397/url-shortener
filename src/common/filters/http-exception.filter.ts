import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const details =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    response.status(status).json({
      success: false,
      details: details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
