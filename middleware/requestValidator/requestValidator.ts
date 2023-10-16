import { ValidationError } from 'joi';
import {
    Request, Response, NextFunction
} from 'express';
import { RequestValidationError } from './requestValidator.errors';
import { SCHEMAS } from './requestValidator.schemas';
import { SchemaName } from './requestValidator.types';
import { ResourceError } from '../../errors';
import { buildErrorMessage, buildRequestContent } from './requestValidator.helper';


export const requestValidator = ( schemaName: SchemaName ) => {
    return async (
        req: Request,
        res: Response<RequestValidationError>,
        next: NextFunction
    ): Promise<Response<RequestValidationError> | void> => {

        const content = buildRequestContent( req );
        const schema = SCHEMAS[ schemaName ];

        try {
            await schema.validateAsync( content, { abortEarly: false } );
            return next();
        } catch ( validationError ) {
            let error = validationError as string | ResourceError;

            if ( validationError instanceof ValidationError ) {
                error = buildErrorMessage( validationError );
            }

            const requestValidationError = new RequestValidationError(
                schemaName as string,
                error
            );
            return res.status( requestValidationError.statusCode )
                .json( requestValidationError );
        }
    };
};