export const generateRandomInteger = (): number => {
    return Math.floor( Math.random() * ( Math.pow( 2, 31 ) - 1 ) );
};

export const generateRandomString = (): string => {
    return Math.random()
        .toString( 36 )
        .substring( 2 );
};