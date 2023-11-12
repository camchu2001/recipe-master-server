import { Response } from 'express';
import { Category } from '@prisma/client';
import { CreateCategoryRequest, GetCategoryRequest } from './categories.type';
import { ResourceError } from '../../errors';
import { createCategory, getCategory } from './categories.service';

export const getCategoryHandler = async (
    req: GetCategoryRequest,
    res: Response<ResourceError | Category>
): Promise<Response<ResourceError | Category>> => {
    const categoryId = Number( req.params.categoryId );

    const getCategoryResult = await getCategory( categoryId );

    if ( getCategoryResult.isError() ) {
        return res
            .status( getCategoryResult.value.statusCode )
            .json( getCategoryResult.value );
    }

    return res
        .status( 200 )
        .json( getCategoryResult.value );
};

export const createCategoryHandler = async (
    req: CreateCategoryRequest,
    res: Response<ResourceError | Category>
): Promise<Response<ResourceError | Category>>=> {
    const { name, description } = req.body;

    const createCategoryResult = await createCategory( {
        name,
        description
    } );

    if ( createCategoryResult.isError() ) {
        return res
            .status( createCategoryResult.value.statusCode )
            .json( createCategoryResult.value );
    }

    return res
        .status( 201 )
        .json( createCategoryResult.value );
};