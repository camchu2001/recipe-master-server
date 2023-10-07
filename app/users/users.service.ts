import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserById = async ( userId: number ): Promise<any> => {
    const user = await prisma.user.findUnique( { where: { id: userId } } );
    return user;
};

export const createUser = async ( user: Prisma.UserCreateInput ): Promise<any> => {
    const newUser = await prisma.user.create( { data: user } );
    return newUser;
};