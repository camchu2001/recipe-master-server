import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.create( {
        data: {
            id: 1,
            firstName: 'Cam',
            lastName: 'Chu',
            email: 'chuphuongcam@gmail.com'
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