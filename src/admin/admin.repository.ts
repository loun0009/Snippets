import { User } from "@prisma/client";
import prisma from "../services/prisma";

class AdminRepository {
    public async findAllUsers(): Promise<User[]> {
        return await prisma.user.findMany();
    }
}

export const adminRepository = new AdminRepository();
