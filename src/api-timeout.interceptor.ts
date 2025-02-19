import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException,
} from '@nestjs/common';
import {
    catchError,
    Observable,
    throwError,
    timeout,
    TimeoutError,
} from 'rxjs';

@Injectable()
export class ApiTimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(30000),
            catchError((err: any) => {
                if (err instanceof TimeoutError) {
                    return throwError(
                        () =>
                            new RequestTimeoutException('Request timed out after 30 seconds'),
                    );
                }
                return throwError(() => err);
            }),
        );
    }
}