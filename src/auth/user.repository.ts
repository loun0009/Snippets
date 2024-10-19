import prisma from "../services/prisma";

class UsersRepository {
    public async isExistingUser(name: string): Promise<any> {
        return await prisma.user.findUniqueOrThrow({
            where: { name: name }
        });
    }
}

export const userRepository = new UsersRepository();
