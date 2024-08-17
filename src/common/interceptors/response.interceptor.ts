import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new LoggerService();
    const request = context.switchToHttp().getRequest();
    const excludedPaths = ['/'];
    const includedPaths = ['/auth/google/callback'];

    logger.info('request.url', request.url);
    if (excludedPaths.includes(request.url) || request.url.includes(includedPaths)) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: true,
          message: data.message || 'Success',
          data: data.data || null,
        };
      }),
    );
  }
}
