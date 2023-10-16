import { PrismaClient } from '@prisma/client';
import { generateRandomString } from '../utils';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.create( {
        data: {
            firstName: 'Cam',
            lastName: 'Chu',
            email: 'chuphuongcam@gmail.com'
        }
    } );

    await prisma.recipe.create( {
        data: {
            name: 'Egg Fried Rice',
            instructions: 'Heat oil in a wok, add beaten eggs, rice, and the optional soy sauce. Stir-fry until cooked, add optional green scallions garnish.'
        }
    } );
};

main()
    .then( async () => {
        await prisma.$disconnect();
    } )
    .catch( async ( e ) => {
        console.error( e );
        await prisma.$disconnect();
        process.exit( 1 );
    } );