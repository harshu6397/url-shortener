import { Injectable, Logger as NestLogger } from '@nestjs/common';
import * as winston from 'winston';
import { get } from 'stack-trace';

@Injectable()
export class LoggerService extends NestLogger {
  private logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp, context }) => {
          const formattedTimestamp = timestamp.slice(0, 19);
          const levelStr = level.toString().replace(/\u001b\[\d+m/g, '');
          if (levelStr === 'error') {
            return `[${level}] [${formattedTimestamp}] ${message}: ${context ? ` ${context}` : ''}`;
          } else {
            return `[${level}] [${formattedTimestamp}] ${message}: ${context ? ` ${JSON.stringify(context)}` : ''}`;
          }
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Http({
          level: 'warn',
          host: 'your-log-server.com',
          path: '/log',
          ssl: true,
        }),
      ],
      exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
      rejectionHandlers: [new winston.transports.File({ filename: 'logs/rejections.log' })],
    });

    // Handle errors in logging itself
    this.logger.on('error', (error) => {
      console.error('Logging error:', error);
    });
  }

  private getFunctionName() {
    const trace = get()[2];
    const parts = trace.getFileName().split('/');
    const filename = parts[parts.length - 1];
    const functionName = trace.getFunctionName() || 'anonymous';
    return `${filename}:${functionName}`;
  }

  info(message: any, context?: any) {
    const functionName = this.getFunctionName();
    this.logger.info(`[${functionName}] ${message}`, { context });
  }

  error(message: any, context?: any) {
    const functionName = this.getFunctionName();
    this.logger.error(`[${functionName}] ${message}`, { context });
  }

  warn(message: any, context?: any) {
    const functionName = this.getFunctionName();
    this.logger.warn(`[${functionName}] ${message}`, { context });
  }

  debug(message: any, context?: any) {
    const functionName = this.getFunctionName();
    this.logger.debug(`[${functionName}] ${message}`, { context });
  }

  verbose(message: any, context?: any) {
    const functionName = this.getFunctionName();
    this.logger.verbose(`[${functionName}] ${message}`, { context });
  }
}
