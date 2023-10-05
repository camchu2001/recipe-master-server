import { app } from './server';

app.listen( 4000, () => {
    console.log( 'Server is running on port 4000 successfully! 🚀' );
    console.log( `Using Node version ${ process.versions.node }` );
} );