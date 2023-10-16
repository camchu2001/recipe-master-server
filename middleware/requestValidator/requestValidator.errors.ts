import { ResourceError } from '../../errors';

export class RequestValidationError extends ResourceError {
    public constructor (
        schemaName: string,
        error: string | ResourceError
    ) {
        const message = `Error Validating the ${ schemaName } Request.`;
        const statusCode = 400;
        const code = 'REQUEST_VALIDATION';

        super( {
            message, code, error, statusCode
        } );
    }
}