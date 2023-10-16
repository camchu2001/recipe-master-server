import { Recipe } from '@prisma/client';
import { generateRandomInteger } from '../../utils';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';
import {
    Either, error, success
} from '../../types';

export const createRecipe = async ( {
    id = generateRandomInteger(),
    name = 'Pho',
    instructions = 'Boil beef broth, add spices like star anise and cinnamon, and simmer. Cook rice noodles, place in a bowl, add hot broth, and top with herbs, bean sprouts, and meat.',
    createdAt = new Date(),
    updatedAt = null
}: Partial<Recipe> ): Promise<Either<DatabaseError, Recipe>> => {
    let seededRecipe: Recipe;

    try {
        seededRecipe = await prismaClient.recipe.create( {
            data: {
                id,
                name,
                instructions,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededRecipe );
};