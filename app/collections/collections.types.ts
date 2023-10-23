import { Request } from 'express';

export interface GetCollectionRequest extends Request {
    params: {
        collectionId: string;
    };
}

export interface CreateCollectionRequest extends Request {
    body: {
        userId: number;
        name: string;
    };
}