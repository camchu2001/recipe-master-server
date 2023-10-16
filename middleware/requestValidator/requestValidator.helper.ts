import { Request } from 'express';
import { ValidationError, ValidationErrorItem } from 'joi';
import { isObjectEmpty } from '../../utils';
import { RequestContent } from './requestValidator.types';

/*
 *This removes empty attributes from
 *the request before the content can
 *be used for validation
 */
export const buildRequestContent = ( req: Request ): RequestContent => {
    const { query, params, body } = req;
    const content: RequestContent = {};

    if ( !isObjectEmpty( query ) ) content.query = query;
    if ( !isObjectEmpty( params ) ) content.params = params;
    if ( !isObjectEmpty( body ) ) content.body = body;
    if ( req.method === 'GET' ) delete content.body;

    return content;
};

export const buildErrorMessage = (
    validationError: ValidationError
): string => {
    const { details } = validationError;
    const errorMessage = details
        .map( ( i: ValidationErrorItem ) => i.message )
        .join( ', ' );
    return errorMessage;
};