import { Response } from 'express';
import { Collection } from '@prisma/client';
import { ResourceError } from '../../errors';
import { CreateCollectionRequest, GetCollectionRequest } from './collections.types';
import { createCollection, getCollection } from './collections.service';

export const getCollectionHandler = async (
    req: GetCollectionRequest,
    res: Response<ResourceError | Collection>
): Promise<Response<ResourceError | Collection>> => {
    const collectionId = Number( req.params.collectionId );

    const getCollectionResult = await getCollection( collectionId );

    if ( getCollectionResult.isError() ) {
        return res
            .status( getCollectionResult.value.statusCode )
            .json( getCollectionResult.value );
    }

    return res
        .status( 200 )
        .json( getCollectionResult.value );
};

export const createCollectionHandler = async (
    req: CreateCollectionRequest,
    res: Response<ResourceError | Collection>
): Promise<Response<ResourceError | Collection>> => {
    const { userId, name } = req.body;

    const createCollectionResult = await createCollection( {
        user: { connect: { id: userId } },
        name
    } );

    if ( createCollectionResult.isError() ) {
        return res
            .status( createCollectionResult.value.statusCode )
            .json( createCollectionResult.value );
    }

    return res
        .status( 201 )
        .json( createCollectionResult.value );
};