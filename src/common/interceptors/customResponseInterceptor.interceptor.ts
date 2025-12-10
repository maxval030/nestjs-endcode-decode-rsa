/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  // BadRequestException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return handler.handle().pipe(
      map((data) => ({ successful: true, error_code: '', data })),
      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        const errorResponse = {
          successful: false,
          error_code: statusCode,
          data: {
            playload: JSON.stringify(request?.body) ?? null,
          },
        };
        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
