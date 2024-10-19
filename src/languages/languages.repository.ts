import prisma from "../services/prisma";

class LanguagesRepository {
    public async findAll(): Promise<any> {
        const languages = await prisma.language.findMany({
            orderBy : { name: 'asc' },
            include: {
                _count: {
                    select: { snippets: true },
                }
            }
        })
        return languages;
    }
}

export const languagesRepository = new LanguagesRepository();