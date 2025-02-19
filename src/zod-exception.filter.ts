import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';

@Catch(ZodError)
export class ZodExceptionFilter<T extends ZodError> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse();
        const status = 400;
        const errors = this.generateValidationErrors(exception);
        return response.status(status).json({
            errors,
            message: 'A validation error occurred',
            statusCode: status,
        });
    }

    generateValidationErrors(e: ZodError): ValidationErrors {
        const errors: ValidationErrors = {};

        for (let i = 0; i < e.issues.length; i++) {
            const issue = e.issues[i];

            errors[issue.path.join('.')] = {
                code: issue.code,
                message: issue.message,
            };
        }

        return errors;
    }
}

export type ValidationErrors = {
    [key: string]: { code: string; message: string };
};