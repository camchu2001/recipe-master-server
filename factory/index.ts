import { User } from '@prisma/client';
import { createUser } from './user';

export class Factory {
    async getUser (
        newUser: Partial<User> = {}
    ): Promise<User> {
        const createBusinessResult = await createUser( newUser );

        if ( createBusinessResult.isError() ) {
            throw createBusinessResult.value;
        }

        return createBusinessResult.value;
    }
}